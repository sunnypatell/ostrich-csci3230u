import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Link } from "lucide-react"

interface PersonResultsProps {
  data: any
}

export default function PersonResults({ data }: PersonResultsProps) {
  // For now, this will mostly display placeholder data
  // In a real implementation, this would display actual OSINT results

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
                <dd className="text-gray-200">{data.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Age</dt>
                <dd className="text-gray-200">Not found</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Location</dt>
                <dd className="text-gray-200">Not found</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Occupation</dt>
                <dd className="text-gray-200">Not found</dd>
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
              {data.emailAddresses && data.emailAddresses.length > 0 ? (
                data.emailAddresses.map((email: string, index: number) => (
                  <div key={`email-${index}`} className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Mail className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-gray-200">{email}</span>
                  </div>
                ))
              ) : (
                <div className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-400">No email addresses found</span>
                </div>
              )}

              {data.phoneNumbers && data.phoneNumbers.length > 0 ? (
                data.phoneNumbers.map((phone: string, index: number) => (
                  <div key={`phone-${index}`} className="p-2 bg-gray-800 rounded-md flex items-center">
                    <Phone className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-gray-200">{phone}</span>
                  </div>
                ))
              ) : (
                <div className="p-2 bg-gray-800 rounded-md flex items-center">
                  <Phone className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-gray-400">No phone numbers found</span>
                </div>
              )}

              {data.locations && data.locations.length > 0 ? (
                data.locations.map((address: string, index: number) => (
                  <div key={`address-${index}`} className="p-2 bg-gray-800 rounded-md flex items-center sm:col-span-2">
                    <MapPin className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-gray-200">{address}</span>
                  </div>
                ))
              ) : (
                <div className="p-2 bg-gray-800 rounded-md flex items-center sm:col-span-2">
                  <MapPin className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-gray-400">No addresses found</span>
                </div>
              )}
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
            {data.socialProfiles && data.socialProfiles.length > 0 ? (
              data.socialProfiles.map((profile: any, index: number) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md">
                  <div className="flex items-center">
                    <Link className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-gray-200 font-medium">{profile.platform}</span>
                  </div>
                  <div className="mt-1 text-gray-400 text-sm">{profile.username}</div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-gray-400 text-center py-2">No social media profiles found</div>
            )}
          </div>
        </CardContent>
      </Card>

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

