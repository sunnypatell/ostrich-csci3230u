import { NextResponse } from "next/server"                                 // needed for handling api responses
import { collectDomainOsint } from "@/lib/security-tools"                 // pulls in our osint collection helper

export async function POST(request: Request) {                             // handles incoming post requests for domain scanning
  try {
    const { domain } = await request.json()                               // grab domain from request body

    if (!domain) {                                                        // basic validation check
      return NextResponse.json({ error: "Domain is required" }, { status: 400 })
    }

    // Validate domain format
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/  // regex to match valid domain patterns

    if (!domainRegex.test(domain)) {                                     // make sure domain matches our regex pattern
      return NextResponse.json({ error: "Invalid domain format." }, { status: 400 })
    }

    // Perform the actual OSINT collection
    const results = await collectDomainOsint(domain)                     // fire off our osint collection and wait for results

    return NextResponse.json({                                           // send back successful response with collected data
      success: true,
      data: results,
    })
  } catch (error) {                                                      // catch any errors during processing
    console.error("OSINT collection error:", error)                      // log error for debugging
    return NextResponse.json({ error: "OSINT collection failed" }, { status: 500 })
  }
}

