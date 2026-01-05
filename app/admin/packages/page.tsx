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
import { Plus, Edit2, Trash2 } from "lucide-react"

interface Package {
  id: number
  name: string
  serviceId: number
  price: string
  currency: string
  duration: string
  description: string
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    serviceId: 0,
    duration: "",
    price: "",
    currency: "BDT",
    description: "",
    highlights: [],
    image: "",
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/admin/packages")
      const data = await response.json()
      setPackages(data.data || [])
    } catch (error) {
      toast.error("Failed to fetch packages")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/admin/packages/${editingId}` : "/api/admin/packages"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error()

      toast.success(editingId ? "Package updated" : "Package created")
      setFormData({
        name: "",
        serviceId: 0,
        duration: "",
        price: "",
        currency: "BDT",
        description: "",
        highlights: [],
        image: "",
      })
      setEditingId(null)
      setIsOpen(false)
      fetchPackages()
    } catch (error) {
      toast.error("Failed to save package")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return

    try {
      const response = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error()
      toast.success("Package deleted")
      fetchPackages()
    } catch (error) {
      toast.error("Failed to delete package")
    }
  }

  const handleEdit = (pkg: Package) => {
    setFormData({
      name: pkg.name,
      serviceId: pkg.serviceId,
      duration: pkg.duration,
      price: pkg.price,
      currency: pkg.currency,
      description: pkg.description,
      highlights: [],
      image: "",
    })
    setEditingId(pkg.id)
    setIsOpen(true)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Packages Management</h1>
          <p className="text-gray-600 mt-2">Manage your travel packages</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Package" : "Create New Package"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label>Package Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Service ID</Label>
                <Input
                  type="number"
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 5 Days / 4 Nights"
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Currency</Label>
                <Input
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <Button type="submit">Save Package</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                  <div className="mt-2 flex gap-4 text-sm">
                    <span className="font-medium text-blue-600">
                      {pkg.price} {pkg.currency}
                    </span>
                    <span className="text-gray-600">{pkg.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(pkg.id)}>
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
