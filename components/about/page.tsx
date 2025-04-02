"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import AboutTeam from "@/components/about-team"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-12">
          <AboutTeam />
        </div>

        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">About OSTRICH</CardTitle>
            <CardDescription className="text-gray-400">
              Open Source Tracking and Recon Intelligence for Cyber Hunting
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-4">
            <p>
              OSTRICH is a comprehensive cybersecurity platform designed to provide security professionals with powerful
              tools for network reconnaissance, vulnerability scanning, and threat intelligence gathering.
            </p>
            <p>
              Built as an OWASP wrapper, OSTRICH integrates with industry-standard security tools and provides a unified
              interface for conducting security assessments and monitoring.
            </p>
            <p>
              The platform is designed to be extensible, allowing security teams to add custom modules and integrate
              with existing security infrastructure.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Acknowledgements</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4">
              OSTRICH builds upon and integrates with several open-source security tools and libraries. We would like to
              acknowledge the contributions of these projects:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>OWASP ZAP - Web application security scanner</li>
              <li>Nmap - Network discovery and security auditing</li>
              <li>OpenVAS - Vulnerability scanning and management</li>
              <li>Metasploit Framework - Penetration testing framework</li>
              <li>TheHarvester - Email and subdomain harvesting tool</li>
              <li>D3.js - Data visualization library</li>
              <li>Next.js - React framework</li>
              <li>Tailwind CSS - Utility-first CSS framework</li>
              <li>shadcn/ui - UI component library</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

