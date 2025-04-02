"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { collectOsintData } from "@/lib/api"
import { Search, Globe, User, Building, Mail, Phone, MapPin, Link, Download } from "lucide-react"

export default function OsintCollector() {
  const [target, setTarget] = useState("")
  const [isCollecting, setIsCollecting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("domain")

  const handleCollect = async () => {
    if (!target.trim()) return

    setIsCollecting(true)
    setProgress(0)
    setResults(null)

    // Simulate collection progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    try {
      // In a real app, this would be an API call
      const data = await collectOsintData(target, activeTab)

      // Wait for progress to complete
      setTimeout(() => {
        setResults(data)
        setIsCollecting(false)
        clearInterval(interval)
        setProgress(100)
      }, 5000)
    } catch (error) {
      console.error("Error during OSINT collection:", error)
      setIsCollecting(false)
      clearInterval(interval)
    }
  }

  const renderResults = () => {
    if (!results) return null

    switch (activeTab) {
      case "domain":
        return <DomainResults data={results} />
      case "person":
        return <PersonResults data={results} />
      case "company":
        return <CompanyResults data={results} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">OSINT Collector</h2>
          <p className="text-gray-400">Gather open-source intelligence</p>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Intelligence Collection</CardTitle>
          <CardDescription className="text-gray-400">Enter a target to gather open-source intelligence</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="bg-gray-700 p-1">
              <TabsTrigger value="domain" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                <Globe className="h-4 w-4 mr-2" />
                Domain
              </TabsTrigger>
              <TabsTrigger value="person" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Person
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                <Building className="h-4 w-4 mr-2" />
                Company
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="osint-target" className="text-gray-300">
                Target
              </Label>
              <Input
                id="osint-target"
                placeholder={
                  activeTab === "domain"
                    ? "e.g. example.com"
                    : activeTab === "person"
                      ? "e.g. John Smith"
                      : "e.g. Acme Corp"
                }
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                disabled={isCollecting}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleCollect}
                disabled={isCollecting || !target.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Search className="h-4 w-4 mr-2" />
                {isCollecting ? "Collecting..." : "Collect Intelligence"}
              </Button>
            </div>
          </div>

          {isCollecting && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Collecting data for {target}</span>
                <span className="text-gray-400">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" indicatorClassName="bg-emerald-500" />
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">Results for {target}</CardTitle>
                <CardDescription className="text-gray-400">Intelligence gathered from open sources</CardDescription>
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
          <CardContent>{renderResults()}</CardContent>
        </Card>
      )}
    </div>
  )
}

function DomainResults({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Domain Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-400">Registrar</dt>
                <dd className="text-gray-200">{data.registrar}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Creation Date</dt>
                <dd className="text-gray-200">{data.creationDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Expiration Date</dt>
                <dd className="text-gray-200">{data.expirationDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Updated Date</dt>
                <dd className="text-gray-200">{data.updatedDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Status</dt>
                <dd className="text-gray-200">{data.status}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">DNS Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.dnsRecords.map((record: any, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{record.type}</span>
                    <span className="text-gray-200">{record.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Subdomains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.subdomains.map((subdomain: string, index: number) => (
              <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                <Globe className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="text-gray-200">{subdomain}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Email Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.emails.map((email: string, index: number) => (
              <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                <Mail className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-gray-200">{email}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PersonResults({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-700/50 border-gray-600 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-400">Full Name</dt>
                <dd className="text-gray-200">{data.fullName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Age</dt>
                <dd className="text-gray-200">{data.age}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Location</dt>
                <dd className="text-gray-200">{data.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Occupation</dt>
                <dd className="text-gray-200">{data.occupation}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="bg-gray-700/50 border-gray-600 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.emails.map((email: string, index: number) => (
                <div key={`email-${index}`} className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-200">{email}</span>
                </div>
              ))}

              {data.phones.map((phone: string, index: number) => (
                <div key={`phone-${index}`} className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Phone className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-gray-200">{phone}</span>
                </div>
              ))}

              {data.addresses.map((address: string, index: number) => (
                <div key={`address-${index}`} className="p-2 bg-gray-800 rounded-md flex items-center sm:col-span-2">
                  <MapPin className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-gray-200">{address}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Social Media Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.socialProfiles.map((profile: any, index: number) => (
              <div key={index} className="p-2 bg-gray-800 rounded-md">
                <div className="flex items-center">
                  <Link className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-200 font-medium">{profile.platform}</span>
                </div>
                <div className="mt-1 text-gray-400 text-sm">{profile.username}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Employment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.employmentHistory.map((job: any, index: number) => (
              <div key={index} className="p-3 bg-gray-800 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-gray-200 font-medium">{job.title}</div>
                    <div className="text-gray-400">{job.company}</div>
                  </div>
                  <div className="text-gray-400 text-sm">{job.period}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CompanyResults({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-400">Legal Name</dt>
                <dd className="text-gray-200">{data.legalName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Founded</dt>
                <dd className="text-gray-200">{data.founded}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Industry</dt>
                <dd className="text-gray-200">{data.industry}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Size</dt>
                <dd className="text-gray-200">{data.size}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Revenue</dt>
                <dd className="text-gray-200">{data.revenue}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.locations.map((location: any, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-gray-200">{location.name}</div>
                      <div className="text-gray-400 text-sm">{location.address}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Key Executives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.executives.map((exec: any, index: number) => (
              <div key={index} className="p-3 bg-gray-800 rounded-md">
                <div className="text-gray-200 font-medium">{exec.name}</div>
                <div className="text-gray-400">{exec.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Digital Footprint</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-gray-300 mb-2 font-medium">Domains</h4>
              <div className="space-y-2">
                {data.domains.map((domain: string, index: number) => (
                  <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Globe className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-gray-200">{domain}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-gray-300 mb-2 font-medium">Social Media</h4>
              <div className="space-y-2">
                {data.socialProfiles.map((profile: any, index: number) => (
                  <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Link className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-gray-200">
                      {profile.platform}: {profile.handle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

