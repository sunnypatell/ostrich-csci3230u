import { NextResponse } from "next/server"
import { createUser } from "@/lib/db"
import { login } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Create the user
    const user = await createUser(username, password, email)

    // Log the user in
    await login(username, password)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error("Registration error:", error)

    // Handle duplicate username/email
    if (error.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "Username or email already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}

