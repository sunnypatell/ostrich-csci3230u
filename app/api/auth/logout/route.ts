import { NextResponse } from "next/server"         // needed for handling api responses
import { logout } from "@/lib/auth"                // imports our logout helper function

export async function POST() {                     // handles post requests to logout endpoint
  try {
    logout()                                       // calls our logout function to clear session

    return NextResponse.json({                     // sends back success response
      success: true,
    })
  } catch (error) {
    console.error("Logout error:", error)          // logs any errors we run into
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })  // returns error response if something breaks
  }
}

