"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus, Edit2 } from "lucide-react"

interface SEOPage {
  id: number
  pagePath: string
  pageTitle: string
  metaDescription: string
  keywords: string
}

export default function SEOManagementPage() {
  const [pages, setPages] = useState<SEOPage[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    pagePath: "",
    pageTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
  })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/seo")
      const data = await response.json()
      setPages(data.data || [])
    } catch (error) {
      toast.error("Failed to fetch SEO pages")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/admin/seo/${editingId}` : "/api/admin/seo"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error()

      toast.success(editingId ? "SEO updated" : "SEO page created")
      setFormData({
        pagePath: "",
        pageTitle: "",
        metaDescription: "",
        keywords: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        canonicalUrl: "",
      })
      setEditingId(null)
      setIsOpen(false)
      fetchPages()
    } catch (error) {
      toast.error("Failed to save SEO page")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Management</h1>
          <p className="text-gray-600 mt-2">Manage SEO tags and metadata for all pages</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit SEO" : "Create New SEO Page"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label>Page Path</Label>
                <Input
                  placeholder="/"
                  value={formData.pagePath}
                  onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Page Title</Label>
                <Input
                  value={formData.pageTitle}
                  onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Meta Description (160 chars max)</Label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  required
                  rows={2}
                  maxLength={160}
                />
              </div>
              <div>
                <Label>Keywords</Label>
                <Input
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                />
              </div>
              <div>
                <Label>OG Title</Label>
                <Input
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                />
              </div>
              <div>
                <Label>OG Description</Label>
                <Textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>OG Image URL</Label>
                <Input
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                />
              </div>
              <div>
                <Label>Canonical URL</Label>
                <Input
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                />
              </div>
              <Button type="submit">Save SEO</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{page.pagePath}</h3>
                  <p className="text-sm text-gray-700 mt-2 font-medium">{page.pageTitle}</p>
                  <p className="text-sm text-gray-600 mt-1">{page.metaDescription}</p>
                  {page.keywords && <p className="text-xs text-gray-500 mt-2">Keywords: {page.keywords}</p>}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle edit
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
