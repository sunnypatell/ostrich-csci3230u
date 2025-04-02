import { NextResponse } from "next/server"
import { collectDomainOsint } from "@/lib/security-tools"

export async function POST(request: Request) {
  try {
    const { domain } = await request.json()

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 })
    }

    // Validate domain format
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/

    if (!domainRegex.test(domain)) {
      return NextResponse.json({ error: "Invalid domain format." }, { status: 400 })
    }

    // Perform the actual OSINT collection
    const results = await collectDomainOsint(domain)

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("OSINT collection error:", error)
    return NextResponse.json({ error: "OSINT collection failed" }, { status: 500 })
  }
}

