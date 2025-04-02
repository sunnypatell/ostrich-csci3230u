import { NextResponse } from "next/server"
import { scanNetwork } from "@/lib/security-tools"

export async function POST(request: Request) {
  try {
    const { target } = await request.json()

    if (!target) {
      return NextResponse.json({ error: "Target is required" }, { status: 400 })
    }

    // Validate target format (IP address or domain)
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/

    if (!ipRegex.test(target) && !domainRegex.test(target)) {
      return NextResponse.json(
        { error: "Invalid target format. Must be a valid IP address or domain name." },
        { status: 400 },
      )
    }

    // Perform the actual network scan
    const results = await scanNetwork(target)

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Network scan error:", error)
    return NextResponse.json({ error: "Network scan failed" }, { status: 500 })
  }
}

