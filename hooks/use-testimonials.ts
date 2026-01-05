"use client"

import { useEffect, useState } from "react"
import { getTestimonials } from "@/lib/api/client"

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials()
        setTestimonials(data.filter((t) => t.active))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch testimonials")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}
