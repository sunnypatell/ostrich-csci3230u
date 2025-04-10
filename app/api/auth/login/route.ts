import { NextResponse } from "next/server"       // pulls in nextjs response utility
import { login } from "@/lib/auth"               // grabs our login helper from auth lib

export async function POST(request: Request) {    // handles post requests for login endpoint
  try {
    const { username, password } = await request.json()    // extracts login creds from request body

    if (!username || !password) {    // makes sure we got both username and password
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })   // sends back 400 if missing credentials
    }

    const user = await login(username, password)    // attempts to log user in with provided creds

    if (!user) {    // checks if login failed
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })    // returns 401 for invalid credentials
    }

    return NextResponse.json({    // successful login response
      success: true,
      user: {                    // sends back minimal user data needed by client
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {    // catches any unexpected errors
    console.error("Authentication error:", error)    // logs error for debugging
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })    // returns 500 for server errors
  }
}
