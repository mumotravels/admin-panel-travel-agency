// Client-side API utilities for fetching content from the backend

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(endpoint, options)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error)
    throw error
  }
}

export async function getHeroSliders() {
  const data = await apiCall<{ data: any[] }>("/api/admin/hero-sliders")
  return data.data || []
}

export async function getBlogPosts() {
  const data = await apiCall<{ data: any[] }>("/api/admin/blog")
  return data.data || []
}

export async function getFAQs() {
  const data = await apiCall<{ data: any[] }>("/api/admin/faqs")
  return data.data || []
}

export async function getServices() {
  const data = await apiCall<{ data: any[] }>("/api/admin/services")
  return data.data || []
}

export async function getPackages() {
  const data = await apiCall<{ data: any[] }>("/api/admin/packages")
  return data.data || []
}

export async function getTestimonials() {
  const data = await apiCall<{ data: any[] }>("/api/admin/testimonials")
  return data.data || []
}

export async function getAboutSection() {
  const data = await apiCall<{ data: any[] }>("/api/admin/about")
  return data.data && data.data.length > 0 ? data.data[0] : null
}

export async function getSEOPage(pagePath: string) {
  const data = await apiCall<{ data: any[] }>("/api/admin/seo")
  const pages = data.data || []
  return pages.find((p) => p.pagePath === pagePath)
}

export async function submitContactForm(formData: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return apiCall("/api/contact/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
}

export async function fetchServices() {
  const response = await fetch("/api/admin/services")
  if (!response.ok) {
    throw new Error("Failed to fetch services")
  }
  return response.json()
}

export async function createService(data: {
  icon: string
  title: string
  description: string
  bulletPoints: string[]
  url: string
}) {
  const response = await fetch("/api/admin/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create service")
  }
  return response.json()
}

export async function deleteService(id: number) {
  const response = await fetch(`/api/admin/services/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete service")
  }
  return response.json()
}
