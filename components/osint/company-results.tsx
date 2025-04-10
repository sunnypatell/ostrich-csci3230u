import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Link, Globe } from "lucide-react"

interface CompanyResultsProps {
  data: any
}

export default function CompanyResults({ data }: CompanyResultsProps) {
  // For now, this will mostly display placeholder data
  // In a real implementation, this would display actual OSINT results

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
                <dd className="text-gray-200">{data.company}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Founded</dt>
                <dd className="text-gray-200">Not found</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Industry</dt>
                <dd className="text-gray-200">Not found</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Size</dt>
                <dd className="text-gray-200">Not found</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Revenue</dt>
                <dd className="text-gray-200">Not found</dd>
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
              {data.locations && data.locations.length > 0 ? (
                data.locations.map((location: any, index: number) => (
                  <div key={index} className="p-2 bg-gray-800 rounded-md">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <div>
                        <div className="text-gray-200">{location.name}</div>
                        <div className="text-gray-400 text-sm">{location.address}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-2">No locations found</div>
              )}
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
            {data.employees && data.employees.length > 0 ? (
              data.employees.map((exec: any, index: number) => (
                <div key={index} className="p-3 bg-gray-800 rounded-md">
                  <div className="text-gray-200 font-medium">{exec.name}</div>
                  <div className="text-gray-400">{exec.title}</div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-gray-400 text-center py-2">No executive information found</div>
            )}
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
                {data.domains && data.domains.length > 0 ? (
                  data.domains.map((domain: string, index: number) => (
                    <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                      <Globe className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-gray-200">{domain}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Globe className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-gray-400">No domains found</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-gray-300 mb-2 font-medium">Social Media</h4>
              <div className="space-y-2">
                {data.socialProfiles && data.socialProfiles.length > 0 ? (
                  data.socialProfiles.map((profile: any, index: number) => (
                    <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                      <Link className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-200">
                        {profile.platform}: {profile.handle}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Link className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-gray-400">No social profiles found</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {data.technologies && data.technologies.length > 0 && (
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {data.technologies.map((tech: any, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md">
                  <div className="text-gray-200">{tech.name}</div>
                  <div className="text-gray-400 text-sm">{tech.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-yellow-900/20 border border-yellow-800 rounded-md p-4 text-yellow-400">
        <p className="text-sm">
          <strong>Note:</strong> For privacy and ethical reasons, this tool only displays limited information that is
          publicly available. In a real OSINT investigation, more data might be available but should be collected and
          used responsibly and legally.
        </p>
      </div>
    </div>
  )
}

