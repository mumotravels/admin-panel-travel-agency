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
import { Plus, Edit2, Trash2, Loader2, Check, AlertCircle } from "lucide-react"

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
  const [operatingId, setOperatingId] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      // Only auto-generate slug if not editing and slug is empty
      slug: editingId ? formData.slug : generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    if (!formData.image) {
      toast.error("Please upload an image")
      setSubmitting(false)
      return
    }

    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Please fill in all required fields")
      setSubmitting(false)
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

      toast.success(editingId ? "Post updated successfully!" : "Post created successfully!", {
        description: editingId ? "Your changes have been saved." : "Your new blog post is ready.",
      })

      // Reset form
      setFormData({ title: "", slug: "", category: "", excerpt: "", content: "", image: "", featured: false })
      setEditingId(null)
      setIsOpen(false)

      // Refresh posts with slight delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 300))
      fetchPosts()
    } catch (error) {
      toast.error(editingId ? "Failed to update post" : "Failed to create post", {
        description: "Please try again later.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    const post = posts.find((p) => p.id === id)
    const confirmed = confirm(`Are you sure you want to delete "${post?.title}"? This action cannot be undone.`)

    if (!confirmed) return

    setOperatingId(id)
    try {
      const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error()

      setPosts(posts.filter((post) => post.id !== id))
      toast.success("Post deleted", {
        description: "The post has been permanently removed.",
      })
    } catch (error) {
      toast.error("Failed to delete post", {
        description: "Please try again later.",
      })
    } finally {
      setOperatingId(null)
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setFormData({ title: "", slug: "", category: "", excerpt: "", content: "", image: "", featured: false })
      setEditingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage your blog posts with ease</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="md:min-w-5xl max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingId ? "Edit Post" : "Create New Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title..."
                  required
                  disabled={submitting}
                  className="transition-colors"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-semibold">
                  Slug *
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="post-url-slug"
                  required
                  disabled={submitting}
                  className="transition-colors"
                />
                <p className="text-xs text-muted-foreground">Auto-generated from title, feel free to edit</p>
              </div>

              {/* Category & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Tutorial, News"
                    disabled={submitting}
                    className="transition-colors"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      disabled={submitting}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium">Featured Post</span>
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-semibold">
                  Excerpt *
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of your post..."
                  required
                  disabled={submitting}
                  rows={3}
                  className="transition-colors resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <ImageUpload
                  label="Blog Featured Image *"
                  onImageUrl={(url) => setFormData({ ...formData, image: url })}
                  preview={formData.image}
                  required
                />
              </div>

              {/* Rich Text Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-semibold">
                  Content *
                </Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="Write your blog post content here..."
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save Post
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts Grid */}
      <div className="space-y-3">
        {posts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No posts yet. Create your first blog post to get started!</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              className="transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg truncate">{post.title}</h3>
                      {post.featured && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{post.category}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post.id)}
                      disabled={submitting || operatingId === post.id}
                      className="gap-2 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={submitting || operatingId !== null}
                      className="gap-2 transition-all"
                    >
                      {operatingId === post.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}