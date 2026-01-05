import { type NextRequest, NextResponse } from "next/server"
import { aboutSections } from "@/lib/db/schema"
import { verifyAdminAuth } from "@/lib/middleware/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const data = await db.select().from(aboutSections)
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about section" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = await verifyAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const result = await db.insert(aboutSections).values(body).returning()
    return NextResponse.json({ data: result[0] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create about section" }, { status: 500 })
  }
}
