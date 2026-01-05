"use client"

import { useEffect, useState } from "react"
import { getHeroSliders } from "@/lib/api/client"

export function useHeroSliders() {
  const [sliders, setSliders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await getHeroSliders()
        setSliders(data.filter((s) => s.active))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch sliders")
      } finally {
        setLoading(false)
      }
    }

    fetchSliders()
  }, [])

  return { sliders, loading, error }
}
