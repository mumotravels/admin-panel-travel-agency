import { type NextRequest, NextResponse } from "next/server"
import { getAuthToken, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthToken()

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const verified = await verifyToken(token)
    if (!verified) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      email: verified.email,
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
