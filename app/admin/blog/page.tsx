"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ImageUpload } from "@/components/image-upload"
import { RichTextEditor } from "@/lib/components/rich-text-editor"
import { toast } from "sonner"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  image: string
  featured: boolean
  createdAt: string
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    featured: false,
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      const data = await response.json()
      setPosts(data.data || [])
    } catch (error) {
      toast.error("Failed to fetch posts")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.image) {
      toast.error("Please upload an image")
      return
    }

    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const url = editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error()

      toast.success(editingId ? "Post updated" : "Post created")
      setFormData({ title: "", slug: "", category: "", excerpt: "", content: "", image: "", featured: false })
      setEditingId(null)
      setIsOpen(false)
      fetchPosts()
    } catch (error) {
      toast.error("Failed to save post")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error()
      toast.success("Post deleted")
      fetchPosts()
    } catch (error) {
      toast.error("Failed to delete post")
    }
  }

  const handleEdit = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id)
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        slug: postToEdit.slug,
        category: postToEdit.category,
        excerpt: postToEdit.excerpt,
        content: postToEdit.content,
        image: postToEdit.image,
        featured: postToEdit.featured,
      })
      setEditingId(id)
      setIsOpen(true)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts with rich text editor</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Post" : "Create New Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Featured Post</span>
                  </label>
                </div>
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div>
                <ImageUpload
                  label="Blog Featured Image"
                  onImageUrl={(url) => setFormData({ ...formData, image: url })}
                  preview={formData.image}
                  required
                />
              </div>
              <div>
                <Label>Content</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="Write your blog post content here..."
                />
              </div>
              <Button type="submit">Save Post</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-600">Category: {post.category}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  {post.featured && (
                    <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
