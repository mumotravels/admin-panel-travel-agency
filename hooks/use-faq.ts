"use client"

import { useEffect, useState } from "react"
import { getFAQs } from "@/lib/api/client"

export function useFAQs() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getFAQs()
        setFaqs(data.filter((f) => f.active))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch FAQs")
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  return { faqs, loading, error }
}
