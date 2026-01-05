import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { heroSliders } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { verifyAdminAuth } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  try {
    const data = await db.select().from(heroSliders).orderBy(desc(heroSliders.createdAt))
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sliders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = await verifyAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const result = await db.insert(heroSliders).values(body).returning()
    return NextResponse.json({ data: result[0] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create slider" }, { status: 500 })
  }
}
