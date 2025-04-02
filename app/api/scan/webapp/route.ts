import { NextResponse } from "next/server"
import { scanWebApplication } from "@/lib/security-tools"

export async function POST(request: Request) {
  try {
    const { target } = await request.json()

    if (!target) {
      return NextResponse.json({ error: "Target is required" }, { status: 400 })
    }

    // Validate target format (URL)
    try {
      new URL(target)
    } catch (e) {
      return NextResponse.json({ error: "Invalid target URL format." }, { status: 400 })
    }

    // Perform the actual web application scan
    const results = await scanWebApplication(target)

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Web application scan error:", error)
    return NextResponse.json({ error: "Web application scan failed" }, { status: 500 })
  }
}

