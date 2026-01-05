"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Package, MessageSquare, BookOpen, Star, Contact } from "lucide-react"

interface DashboardStats {
  sliders: number
  services: number
  packages: number
  blog: number
  testimonials: number
  faqs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    sliders: 0,
    services: 0,
    packages: 0,
    blog: 0,
    testimonials: 0,
    faqs: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from various endpoints
        const responses = await Promise.all([
          fetch("/api/admin/hero-sliders"),
          fetch("/api/admin/services"),
          fetch("/api/admin/packages"),
          fetch("/api/admin/blog"),
          fetch("/api/admin/testimonials"),
          fetch("/api/admin/faqs"),
        ])

        const data = await Promise.all(responses.map((r) => (r.ok ? r.json() : { data: [] })))

        setStats({
          sliders: data[0].data?.length || 0,
          services: data[1].data?.length || 0,
          packages: data[2].data?.length || 0,
          blog: data[3].data?.length || 0,
          testimonials: data[4].data?.length || 0,
          faqs: data[5].data?.length || 0,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
  }, [])

  const statsCards = [
    { title: "Hero Sliders", count: stats.sliders, icon: ImageIcon, color: "bg-blue-50 text-blue-600" },
    { title: "Services", count: stats.services, icon: Package, color: "bg-green-50 text-green-600" },
    { title: "Packages", count: stats.packages, icon: Package, color: "bg-purple-50 text-purple-600" },
    { title: "Blog Posts", count: stats.blog, icon: BookOpen, color: "bg-orange-50 text-orange-600" },
    { title: "Testimonials", count: stats.testimonials, icon: Star, color: "bg-pink-50 text-pink-600" },
    { title: "FAQs", count: stats.faqs, icon: MessageSquare, color: "bg-yellow-50 text-yellow-600" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin control panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Access common admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/admin/hero-slider" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900">Manage Hero Slider</h3>
              <p className="text-sm text-gray-600">Update homepage hero section</p>
            </a>
            <a href="/admin/blog" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900">Manage Blog Posts</h3>
              <p className="text-sm text-gray-600">Create and edit blog content</p>
            </a>
            <a href="/admin/services" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900">Manage Services</h3>
              <p className="text-sm text-gray-600">Update service offerings</p>
            </a>
            <a href="/admin/seo" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900">SEO Management</h3>
              <p className="text-sm text-gray-600">Configure SEO tags and metadata</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
