"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Server, Activity } from "lucide-react"
import { fetchDashboardData } from "@/lib/api"
import ThreatActivityChart from "./charts/threat-activity-chart"
import VulnerabilityDistribution from "./charts/vulnerability-distribution"
import RecentAlerts from "./recent-alerts"

interface DashboardData {
  threatCount: number
  vulnerabilityCount: number
  scannedHosts: number
  activeScans: number
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    threatCount: 0,
    vulnerabilityCount: 0,
    scannedHosts: 0,
    activeScans: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Security Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Active Threats</CardDescription>
            <CardTitle className="text-2xl text-white flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-500" />
              {isLoading ? "..." : data.threatCount}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Vulnerabilities</CardDescription>
            <CardTitle className="text-2xl text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              {isLoading ? "..." : data.vulnerabilityCount}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Scanned Hosts</CardDescription>
            <CardTitle className="text-2xl text-white flex items-center">
              <Server className="h-5 w-5 mr-2 text-blue-500" />
              {isLoading ? "..." : data.scannedHosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Active Scans</CardDescription>
            <CardTitle className="text-2xl text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-emerald-500" />
              {isLoading ? "..." : data.activeScans}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Threat Activity</CardTitle>
            <CardDescription className="text-gray-400">Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ThreatActivityChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Vulnerability Distribution</CardTitle>
            <CardDescription className="text-gray-400">By severity</CardDescription>
          </CardHeader>
          <CardContent>
            <VulnerabilityDistribution />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Alerts</CardTitle>
          <CardDescription className="text-gray-400">Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentAlerts />
        </CardContent>
      </Card>
    </div>
  )
}

