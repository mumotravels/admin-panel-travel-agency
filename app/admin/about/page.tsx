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
import { Edit2 } from "lucide-react"

interface AboutSection {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  points: string[]
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    points: [] as string[],
  })

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const response = await fetch("/api/admin/about")
      const data = await response.json()
      if (data.data && data.data.length > 0) {
        const aboutData = data.data[0]
        setAbout(aboutData)
        setFormData({
          title: aboutData.title,
          subtitle: aboutData.subtitle,
          description: aboutData.description,
          image: aboutData.image,
          points: aboutData.points || [],
        })
      }
    } catch (error) {
      toast.error("Failed to fetch about section")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = about ? `/api/admin/about/${about.id}` : "/api/admin/about"
      const method = about ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error()

      toast.success(about ? "About section updated" : "About section created")
      setIsOpen(false)
      fetchAbout()
    } catch (error) {
      toast.error("Failed to save about section")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">About Section</h1>
          <p className="text-gray-600 mt-2">Manage your about page content</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              {about ? "Edit" : "Create"} About Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit About Section</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={6}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </div>
              <Button type="submit">Save About Section</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {about ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{about.title}</h3>
                <p className="text-gray-600 mt-1">{about.subtitle}</p>
              </div>
              {about.image && (
                <img
                  src={about.image || "/placeholder.svg"}
                  alt={about.title}
                  className="w-full h-64 object-cover rounded"
                />
              )}
              <p className="text-gray-700">{about.description}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-600">No about section created yet</CardContent>
        </Card>
      )}
    </div>
  )
}
