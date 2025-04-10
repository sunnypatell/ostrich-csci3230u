import { NextResponse } from "next/server"               // nextjs response helper for api routes
import { scanNetwork } from "@/lib/security-tools"       // import our network scanning utility

export async function POST(request: Request) {           // handles post requests for network scanning
  try {
    const { target } = await request.json()             // extract target from request body

    if (!target) {                                      // basic validation - make sure we got a target
      return NextResponse.json({ error: "Target is required" }, { status: 400 })
    }

    // regex patterns for input validation
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/  // matches ipv4 addresses like 192.168.1.1
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/  // matches domain names

    if (!ipRegex.test(target) && !domainRegex.test(target)) {    // check if input matches either pattern
      return NextResponse.json(
        { error: "Invalid target format. Must be a valid IP address or domain name." },
        { status: 400 },
      )
    }

    const results = await scanNetwork(target)           // run our actual network scan

    return NextResponse.json({                          // send back successful response with scan data
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Network scan error:", error)         // log any errors for debugging
    return NextResponse.json({ error: "Network scan failed" }, { status: 500 })  // return 500 for any unexpected errors
  }
}

