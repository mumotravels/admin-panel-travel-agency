import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { testimonials } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/middleware/auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await verifyAdminAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const result = await db
      .update(testimonials)
      .set(body)
      .where(eq(testimonials.id, Number.parseInt(id)))
      .returning()

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await verifyAdminAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    await db.delete(testimonials).where(eq(testimonials.id, Number.parseInt(id)))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
