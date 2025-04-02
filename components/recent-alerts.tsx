"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchRecentAlerts } from "@/lib/api"
import { AlertCircle, AlertTriangle, Info, Shield, Clock } from "lucide-react"

interface Alert {
  id: string
  timestamp: string
  type: "intrusion" | "vulnerability" | "reconnaissance" | "malware"
  severity: "critical" | "high" | "medium" | "low" | "info"
  source: string
  description: string
}

export default function RecentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        // In a real app, this would be an API call
        const data = await fetchRecentAlerts()
        setAlerts(data as Alert[])
      } catch (error) {
        console.error("Error loading alerts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAlerts()
  }, [])

  const getSeverityBadge = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-900/20 text-red-500 border-red-800">
            <AlertCircle className="h-3 w-3 mr-1" /> Critical
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-900/20 text-orange-500 border-orange-800">
            <AlertTriangle className="h-3 w-3 mr-1" /> High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-900/20 text-yellow-500 border-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" /> Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-emerald-900/20 text-emerald-500 border-emerald-800">
            <Shield className="h-3 w-3 mr-1" /> Low
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-900/20 text-blue-500 border-blue-800">
            <Info className="h-3 w-3 mr-1" /> Info
          </Badge>
        )
    }
  }

  const getTypeIcon = (type: Alert["type"]) => {
    switch (type) {
      case "intrusion":
        return <Shield className="h-4 w-4 text-red-500" />
      case "vulnerability":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "reconnaissance":
        return <Info className="h-4 w-4 text-blue-500" />
      case "malware":
        return <AlertCircle className="h-4 w-4 text-purple-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-gray-400">Type</TableHead>
            <TableHead className="text-gray-400">Severity</TableHead>
            <TableHead className="text-gray-400">Source</TableHead>
            <TableHead className="text-gray-400 w-full">Description</TableHead>
            <TableHead className="text-gray-400">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                No recent alerts found
              </TableCell>
            </TableRow>
          ) : (
            alerts.map((alert) => (
              <TableRow key={alert.id} className="border-gray-700">
                <TableCell className="font-medium text-gray-300 flex items-center">
                  {getTypeIcon(alert.type)}
                  <span className="ml-2 capitalize">{alert.type}</span>
                </TableCell>
                <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                <TableCell className="text-gray-300">{alert.source}</TableCell>
                <TableCell className="text-gray-300">{alert.description}</TableCell>
                <TableCell className="text-gray-400 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

