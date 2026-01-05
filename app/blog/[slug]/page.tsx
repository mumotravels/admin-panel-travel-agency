import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostContent } from "@/components/blog-post-content"
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | Mumo Travels - Travel Tips & Inspiration",
    }
  }

  return {
    title: `${post.title} | Mumo Travels - Travel Tips & Inspiration`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen px-4 md:px-20">
      <BlogPostContent post={post} />
    </main>
  )
}
