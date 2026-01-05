import { type NextRequest, NextResponse } from "next/server"
import { aboutSections } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/middleware/auth"
import { db } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await verifyAdminAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const result = await db
      .update(aboutSections)
      .set(body)
      .where(eq(aboutSections.id, Number.parseInt(id)))
      .returning()

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about section" }, { status: 500 })
  }
}
