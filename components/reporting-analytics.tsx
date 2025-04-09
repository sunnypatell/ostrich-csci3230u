"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateReport } from "@/lib/api"
import { BarChart3, PieChart, LineChart, Download, FileText, Calendar } from "lucide-react"
import VulnerabilityTrendChart from "./charts/vulnerability-trend-chart"
import AttackSourcesChart from "./charts/attack-sources-chart"
import SecurityPostureChart from "./charts/security-posture-chart"

export default function ReportingAnalytics() {
  const [reportType, setReportType] = useState("vulnerability")
  const [timeRange, setTimeRange] = useState("30d")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    try {
      // In a real app, this would be an API call
      await generateReport(reportType, timeRange)

      // Simulate report generation
      setTimeout(() => {
        setIsGenerating(false)
        // In a real app, this would trigger a download or open a new tab
        alert("Report generated successfully!")
      }, 2000)
    } catch (error) {
      console.error("Error generating report:", error)
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Reporting & Analytics</h2>
          <p className="text-gray-400">Generate reports and analyze security data</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px] bg-gray-700 border-gray-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vulnerability" onValueChange={setReportType} className="space-y-6">
        <TabsList className="bg-gray-800/50 p-1">
          <TabsTrigger
            value="vulnerability"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Vulnerability Trends
          </TabsTrigger>
          <TabsTrigger value="attack" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <PieChart className="h-4 w-4 mr-2" />
            Attack Sources
          </TabsTrigger>
          <TabsTrigger value="posture" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <LineChart className="h-4 w-4 mr-2" />
            Security Posture
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerability" className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Vulnerability Trends</CardTitle>
                  <CardDescription className="text-gray-400">Analysis of vulnerabilities over time</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[400px]">
              <VulnerabilityTrendChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Vulnerable Systems</CardTitle>
                <CardDescription className="text-gray-400">Systems with the most vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Web Server 1", count: 24, percentage: 80 },
                    { name: "Database Server", count: 18, percentage: 60 },
                    { name: "Application Server", count: 15, percentage: 50 },
                    { name: "File Server", count: 12, percentage: 40 },
                    { name: "Mail Server", count: 9, percentage: 30 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-gray-400">{item.count} vulnerabilities</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-emerald-600 h-2.5 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Vulnerability Categories</CardTitle>
                <CardDescription className="text-gray-400">Distribution by vulnerability type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Injection Flaws", count: 32, percentage: 75 },
                    { name: "Authentication Issues", count: 28, percentage: 65 },
                    { name: "Misconfiguration", count: 24, percentage: 55 },
                    { name: "Outdated Software", count: 20, percentage: 45 },
                    { name: "Insecure APIs", count: 16, percentage: 35 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-gray-400">{item.count} instances</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attack" className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Attack Sources</CardTitle>
                  <CardDescription className="text-gray-400">Geographic distribution of attack origins</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AttackSourcesChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Attack Types</CardTitle>
                <CardDescription className="text-gray-400">Distribution by attack methodology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Brute Force", count: 1245, percentage: 85 },
                    { name: "SQL Injection", count: 876, percentage: 60 },
                    { name: "XSS", count: 654, percentage: 45 },
                    { name: "DDoS", count: 432, percentage: 30 },
                    { name: "Phishing", count: 321, percentage: 22 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-gray-400">{item.count} attempts</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Attacker IPs</CardTitle>
                <CardDescription className="text-gray-400">Most active malicious IP addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { ip: "45.227.253.98", country: "Russia", count: 2341 },
                    { ip: "103.74.19.104", country: "China", count: 1876 },
                    { ip: "91.134.238.12", country: "Ukraine", count: 1543 },
                    { ip: "185.156.73.54", country: "North Korea", count: 987 },
                    { ip: "79.124.62.26", country: "Iran", count: 765 },
                  ].map((item, index) => (
                    <div key={index} className="p-2 bg-gray-700 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-gray-200 font-mono">{item.ip}</div>
                          <div className="text-gray-400 text-sm">{item.country}</div>
                        </div>
                        <div className="text-red-400">{item.count} attempts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posture" className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Security Posture</CardTitle>
                  <CardDescription className="text-gray-400">Overall security score over time</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SecurityPostureChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Security Controls</CardTitle>
                <CardDescription className="text-gray-400">Implementation status of security controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Firewall Rules", status: "Implemented", score: 92 },
                    { name: "Patch Management", status: "Partial", score: 78 },
                    { name: "Access Control", status: "Implemented", score: 95 },
                    { name: "Encryption", status: "Partial", score: 82 },
                    { name: "Backup & Recovery", status: "Implemented", score: 88 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.name}</span>
                        <span
                          className={`text-sm ${item.status === "Implemented" ? "text-emerald-500" : "text-yellow-500"}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${item.score > 90 ? "bg-emerald-600" : item.score > 80 ? "bg-blue-600" : "bg-yellow-600"}`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-gray-400 text-sm mt-1">Score: {item.score}/100</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Compliance Status</CardTitle>
                <CardDescription className="text-gray-400">Regulatory compliance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { standard: "GDPR", status: "Compliant", score: 94 },
                    { standard: "PCI DSS", status: "Compliant", score: 96 },
                    { standard: "HIPAA", status: "Partial", score: 82 },
                    { standard: "ISO 27001", status: "Compliant", score: 91 },
                    { standard: "NIST CSF", status: "Partial", score: 78 },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-700 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-gray-200">{item.standard}</div>
                          <div
                            className={`text-sm ${item.status === "Compliant" ? "text-emerald-500" : "text-yellow-500"}`}
                          >
                            {item.status}
                          </div>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600">
                          <span
                            className={`text-sm font-medium ${item.score > 90 ? "text-emerald-500" : item.score > 80 ? "text-blue-500" : "text-yellow-500"}`}
                          >
                            {item.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

