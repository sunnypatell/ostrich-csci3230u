import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Github, Linkedin, Mail } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  links?: {
    github?: string
    linkedin?: string
    email?: string
  }
}

export default function AboutTeam() {
  const teamMembers: TeamMember[] = [
    {
      name: "Sunny Patel",
      role: "Lead Developer",
      bio: "Cybersecurity specialist with expertise in penetration testing and network security. Lead developer of the OSTRICH platform.",
      image: "/placeholder.svg?height=200&width=200",
      links: {
        github: "https://github.com/sunnypatell",
        linkedin: "https://www.linkedin.com/in/sunny-patel-30b460204/",
        email: "sunnypatel124555@gmail.com",
      },
    },
    {
      name: "Royce Mathew",
      role: "Security Researcher",
      bio: "Focused on vulnerability research and exploit development. Contributed to the vulnerability scanning module.",
      image: "/placeholder.svg?height=200&width=200",
      links: {
        github: "https://github.com/roycemathew",
        linkedin: "https://linkedin.com/in/roycemathew",
      },
    },
    {
      name: "Michael Ispahani",
      role: "Backend Developer",
      bio: "Specialized in secure API development and database architecture. Implemented the backend infrastructure for OSTRICH.",
      image: "/placeholder.svg?height=200&width=200",
      links: {
        github: "https://github.com/michaelispahani",
        email: "michael@example.com",
      },
    },
    {
      name: "Alyesha Singh",
      role: "UI/UX Designer",
      bio: "Experienced in creating intuitive interfaces for security tools. Designed the user experience and visual elements of OSTRICH.",
      image: "/placeholder.svg?height=200&width=200",
      links: {
        linkedin: "https://linkedin.com/in/alyeshasingh",
        email: "alyesha@example.com",
      },
    },
    {
      name: "Freza Majithia",
      role: "Security Analyst",
      bio: "Specialized in threat intelligence and OSINT techniques. Developed the OSINT collection module for OSTRICH.",
      image: "/placeholder.svg?height=200&width=200",
      links: {
        github: "https://github.com/frezamajithia",
        linkedin: "https://linkedin.com/in/frezamajithia",
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Meet the Team</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          OSTRICH is developed by a dedicated team of cybersecurity professionals and developers committed to creating
          powerful open-source security tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.name} className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <div className="aspect-square w-full overflow-hidden bg-gray-700">
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">{member.name}</CardTitle>
              <CardDescription className="text-emerald-500">{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{member.bio}</p>

              {member.links && (
                <div className="flex space-x-3 mt-2">
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.links.email && (
                    <a href={`mailto:${member.links.email}`} className="text-gray-400 hover:text-white">
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

