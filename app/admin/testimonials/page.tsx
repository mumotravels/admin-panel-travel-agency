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
import { Plus, Edit2, Trash2, Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  title: string
  content: string
  rating: number
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: "",
    rating: 5,
    image: "",
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials")
      const data = await response.json()
      setTestimonials(data.data || [])
    } catch (error) {
      toast.error("Failed to fetch testimonials")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error()

      toast.success(editingId ? "Testimonial updated" : "Testimonial created")
      setFormData({ name: "", title: "", content: "", rating: 5, image: "" })
      setEditingId(null)
      setIsOpen(false)
      fetchTestimonials()
    } catch (error) {
      toast.error("Failed to save testimonial")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error()
      toast.success("Testimonial deleted")
      fetchTestimonials()
    } catch (error) {
      toast.error("Failed to delete testimonial")
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      title: testimonial.title,
      content: testimonial.content,
      rating: testimonial.rating,
      image: "",
    })
    setEditingId(testimonial.id)
    setIsOpen(true)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="text-gray-600 mt-2">Manage customer testimonials</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Testimonial" : "Create New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Customer Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Title/Position</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Business Traveler"
                />
              </div>
              <div>
                <Label>Testimonial Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold">{formData.rating}</span>
                </div>
              </div>
              <Button type="submit">Save Testimonial</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2">{testimonial.content}</p>
                  <p className="text-sm font-semibold mt-3">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.title}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
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
