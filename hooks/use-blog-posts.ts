"use client"

import { useEffect, useState } from "react"
import { getBlogPosts } from "@/lib/api/client"

export function useBlogPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}
