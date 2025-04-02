"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Shield, Activity, Search, AlertTriangle, BarChart3, Globe, Lock } from "lucide-react"
import Dashboard from "@/components/dashboard"
import NetworkMap from "@/components/network-map"
import VulnerabilityScanner from "@/components/vulnerability-scanner"
import OsintCollector from "@/components/osint-collector"
import ReportingAnalytics from "@/components/reporting-analytics"
import LoginForm from "@/components/login-form"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">OSTRICH</h1>
            <p className="text-gray-400">Open Source Tracking and Recon Intelligence for Cyber Hunting</p>
          </div>
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="border-b border-gray-800 bg-gray-900/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <h1 className="text-xl font-bold text-white">OSTRICH</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setIsLoggedIn(false)}>
              <Lock className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-5 gap-2 bg-gray-800/50 p-1">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Network Map
            </TabsTrigger>
            <TabsTrigger
              value="vulnerabilities"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger value="osint" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Search className="h-4 w-4 mr-2" />
              OSINT
            </TabsTrigger>
            <TabsTrigger
              value="reporting"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Reporting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <NetworkMap />
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <VulnerabilityScanner />
          </TabsContent>

          <TabsContent value="osint" className="space-y-4">
            <OsintCollector />
          </TabsContent>

          <TabsContent value="reporting" className="space-y-4">
            <ReportingAnalytics />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-gray-800 bg-gray-900/60 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-white">OSTRICH</h2>
            </div>
            <p className="text-gray-400 text-sm">Open Source Tracking and Recon Intelligence for Cyber Hunting</p>

            <div className="mt-4">
              <h3 className="text-white font-medium text-center mb-2">Contributors</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <p className="text-emerald-500 font-medium">Sunny Patel</p>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <p className="text-emerald-500 font-medium">Royce Mathew</p>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <p className="text-emerald-500 font-medium">Michael Ispahani</p>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <p className="text-emerald-500 font-medium">Alyesha Singh</p>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <p className="text-emerald-500 font-medium">Freza Majithia</p>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-xs mt-6">
              © {new Date().getFullYear()} OSTRICH Project. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

