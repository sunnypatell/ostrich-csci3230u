import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Globe } from "lucide-react"

interface IpResultsProps {
  data: any
}

export default function IpResults({ data }: IpResultsProps) {
  return (
    <div className="space-y-6">
      {data.geolocation && (
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Geolocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Country</dt>
                  <dd className="text-gray-200">{data.geolocation.country || "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Region</dt>
                  <dd className="text-gray-200">{data.geolocation.region || "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">City</dt>
                  <dd className="text-gray-200">{data.geolocation.city || "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Timezone</dt>
                  <dd className="text-gray-200">{data.geolocation.timezone || "N/A"}</dd>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Latitude</dt>
                  <dd className="text-gray-200">{data.geolocation.latitude || "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Longitude</dt>
                  <dd className="text-gray-200">{data.geolocation.longitude || "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Organization</dt>
                  <dd className="text-gray-200">{data.geolocation.org || "N/A"}</dd>
                </div>
                {data.asn && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">ASN</dt>
                    <dd className="text-gray-200">
                      {data.asn.number} ({data.asn.name})
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Hostnames</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.hostnames && data.hostnames.length > 0 ? (
                data.hostnames.map((hostname: string, index: number) => (
                  <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Globe className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-gray-200">{hostname}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-2">No hostnames found</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Open Ports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.ports && data.ports.length > 0 ? (
                data.ports.map((port: any, index: number) => (
                  <div key={index} className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Server className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-gray-200">
                      {port.port} - {port.service}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-2">No open ports found</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {data.geolocation && (
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Map Location</CardTitle>
          </CardHeader>
          <CardContent>
            {data.geolocation.latitude && data.geolocation.longitude ? (
              <div className="aspect-video w-full bg-gray-800 rounded-md flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.geolocation.longitude - 0.01},${data.geolocation.latitude - 0.01},${data.geolocation.longitude + 0.01},${data.geolocation.latitude + 0.01}&layer=mapnik&marker=${data.geolocation.latitude},${data.geolocation.longitude}`}
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-2">Map location not available</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

