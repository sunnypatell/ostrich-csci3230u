import { NextResponse } from "next/server"

// This is a mock authentication API
// In a real application, this would validate credentials against a database
// and implement proper authentication with JWT or similar

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // For demo purposes, accept any non-empty credentials
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // In a real app, validate credentials against a database
    // and generate a proper JWT token

    return NextResponse.json({
      success: true,
      user: {
        id: "1",
        username,
        role: "admin",
      },
      token: "mock-jwt-token",
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

