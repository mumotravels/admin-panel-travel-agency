import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

// In-memory storage (replace with database in production)
let currentLogo = ""

export async function GET() {
  return NextResponse.json({ logo: currentLogo })
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("adminToken")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { logo } = await request.json()
    currentLogo = logo
    return NextResponse.json({ success: true, logo })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update logo" }, { status: 500 })
  }
}
