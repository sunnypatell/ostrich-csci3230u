import { NextResponse } from "next/server"          // brings in nextjs response handling
import { createUser } from "@/lib/db"              // imports our user creation function
import { login } from "@/lib/auth"                 // grabs login functionality from auth lib

export async function POST(request: Request) {      // handles post requests for registration
  try {
    const { username, password, email } = await request.json()    // extracts user data from request body

    if (!username || !password) {                  // makes sure we have required fields
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })    // sends back error if missing stuff
    }

    // Create the user
    const user = await createUser(username, password, email)      // creates new user in db

    // Log the user in
    await login(username, password)                // logs user in right after registration

    return NextResponse.json({                     // sends back success response with user info
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {                          // catches any errors during registration
    console.error("Registration error:", error)    // logs errors for debugging

    // Handle duplicate username/email
    if (error.message?.includes("UNIQUE constraint failed")) {    // checks if user/email already exists
      return NextResponse.json({ error: "Username or email already exists" }, { status: 409 })    // sends conflict error
    }

    return NextResponse.json({ error: "Registration failed" }, { status: 500 })    // sends generic error for other failures
  }
}
