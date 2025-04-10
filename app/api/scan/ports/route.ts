import { NextResponse } from "next/server"                 // needed for handling api responses
import { scanPorts } from "@/lib/security-tools"          // imports our port scanning utility

export async function POST(request: Request) {            // handles incoming post requests for port scanning
  try {
    const { target, ports } = await request.json()       // extracts target and ports from request body

    if (!target) {                                       // quick check if target exists
      return NextResponse.json({ error: "Target is required" }, { status: 400 })
    }

    if (!ports || !Array.isArray(ports) || ports.length === 0) {    // validates ports array isn't empty or invalid
      return NextResponse.json({ error: "Valid ports array is required" }, { status: 400 })
    }

    // regex patterns for input validation
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/                           // matches ipv4 format
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/  // matches domain name format

    if (!ipRegex.test(target) && !domainRegex.test(target)) {      // makes sure target is either valid ip or domain
      return NextResponse.json(
        { error: "Invalid target format. Must be a valid IP address or domain name." },
        { status: 400 },
      )
    }

    const results = await scanPorts(target, ports)       // runs actual port scan and waits for results

    return NextResponse.json({                           // sends back successful scan results
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Port scan error:", error)            // logs any errors for debugging
    return NextResponse.json({ error: "Port scan failed" }, { status: 500 })   // returns error response
  }
}
