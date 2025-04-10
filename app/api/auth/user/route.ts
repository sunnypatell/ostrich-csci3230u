import { NextResponse } from "next/server"              // lets us send json responses back to client
import { getCurrentUser } from "@/lib/auth"             // pulls in our auth helper function

export async function GET() {                           // handles incoming get requests to this endpoint
  try {
    const user = await getCurrentUser()                 // grab currently logged in user data

    if (!user) {                                       // no user? they're not logged in
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({                         // everything worked, send back user info
      success: true,
      user: {
        id: user.id,                                  // just sending essential user fields
        username: user.username,                      // keeping it minimal for security
        email: user.email,
        role: user.role,                             // role helps with permission checks
      },
    })
  } catch (error) {
    console.error("Get user error:", error)           // log any issues for debugging
    return NextResponse.json({ error: "Failed to get user information" }, { status: 500 })
  }
}

