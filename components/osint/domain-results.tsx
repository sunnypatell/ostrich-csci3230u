import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Mail, Server, Code } from "lucide-react"

interface DomainResultsProps {
  data: any
}

export default function DomainResults({ data }: DomainResultsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Domain Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              {data.whois && (
                <>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Registrar</dt>
                    <dd className="text-gray-200">{data.whois.registrar || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Creation Date</dt>
                    <dd className="text-gray-200">{data.whois.creationDate || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Expiration Date</dt>
                    <dd className="text-gray-200">{data.whois.expirationDate || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Updated Date</dt>
                    <dd className="text-gray-200">{data.whois.updatedDate || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Status</dt>
                    <dd className="text-gray-200">{data.whois.status || "N/A"}</dd>
                  </div>
                </>
              )}
              {!data.whois && <div className="text-gray-400 text-center py-2">No WHOIS data available</div>}
            </dl>
          </CardContent>
        </Card>

        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">DNS Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.dnsRecords &&
                Object.entries(data.dnsRecords).map(([type, records]: [string, any]) => (
                  <div key={type} className="p-2 bg-gray-800 rounded-md">
                    <div className="text-gray-300 font-medium mb-1">{type.toUpperCase()} Records</div>
                    {Array.isArray(records) && records.length > 0 ? (
                      records.map((record: any, index: number) => (
                        <div key={index} className="text-gray-400 text-sm ml-2">
                          {typeof record === "object" ? JSON.stringify(record) : record}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm ml-2">No records found</div>
                    )}
                  </div>
                ))}
              {(!data.dnsRecords || Object.keys(data.dnsRecords).length === 0) && (
                <div className="text-gray-400 text-center py-2">No DNS records found</div>
              )}
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
            {data.subdomains && data.subdomains.length > 0 ? (
              data.subdomains.map((subdomain: string, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Globe className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-gray-200">{subdomain}</span>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-gray-400 text-center py-2">No subdomains found</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Email Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.emails && data.emails.length > 0 ? (
              data.emails.map((email: string, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-200">{email}</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-gray-400 text-center py-2">No email addresses found</div>
            )}
          </div>
        </CardContent>
      </Card>

      {data.ports && data.ports.length > 0 && (
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Open Ports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {data.ports.map((port: any, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Server className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-gray-200">
                    {port.port} - {port.service}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data.technologies && data.technologies.length > 0 && (
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {data.technologies.map((tech: any, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Code className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <span className="text-gray-400 text-sm">{tech.name}:</span>
                    <span className="text-gray-200 ml-1">{tech.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

