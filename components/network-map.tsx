"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchNetworkData } from "@/lib/api"
import * as d3 from "d3"
import { RefreshCw, ZoomIn, ZoomOut, Download } from "lucide-react"

interface Node {
  id: string
  name: string
  type: "server" | "router" | "workstation" | "firewall" | "unknown"
  ip: string
  status: "online" | "offline" | "vulnerable"
}

interface Link {
  source: string
  target: string
  strength: number
}

interface NetworkData {
  nodes: Node[]
  links: Link[]
}

export default function NetworkMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [networkData, setNetworkData] = useState<NetworkData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        // In a real app, this would be an API call
        const data = await fetchNetworkData()
        setNetworkData(data)
      } catch (error) {
        console.error("Error loading network data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNetworkData()
  }, [])

  useEffect(() => {
    if (!networkData || !svgRef.current) return

    renderNetworkGraph(networkData)
  }, [networkData, searchTerm, zoomLevel])

  const renderNetworkGraph = (data: NetworkData) => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Filter nodes based on search term
    const filteredNodes = searchTerm
      ? data.nodes.filter(
          (node) => node.name.toLowerCase().includes(searchTerm.toLowerCase()) || node.ip.includes(searchTerm),
        )
      : data.nodes

    const filteredNodeIds = new Set(filteredNodes.map((node) => node.id))

    // Filter links to only include connections between filtered nodes
    const filteredLinks = data.links.filter(
      (link) => filteredNodeIds.has(link.source as string) && filteredNodeIds.has(link.target as string),
    )

    // Set up dimensions
    const width = svgRef.current.clientWidth
    const height = 500

    // Create SVG
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    // Create a group for the zoom behavior
    const g = svg.append("g")

    // Apply zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })

    svg.call(zoom as any)

    // Set initial zoom level
    svg.call((zoom as any).scaleTo, zoomLevel)

    // Create a simulation with forces
    const simulation = d3
      .forceSimulation(filteredNodes as any)
      .force(
        "link",
        d3
          .forceLink(filteredLinks)
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40))

    // Define node colors based on type
    const nodeColors: Record<string, string> = {
      server: "#3b82f6", // blue
      router: "#10b981", // green
      workstation: "#8b5cf6", // purple
      firewall: "#ef4444", // red
      unknown: "#6b7280", // gray
    }

    // Define node colors based on status
    const statusColors: Record<string, string> = {
      online: "#10b981", // green
      offline: "#6b7280", // gray
      vulnerable: "#ef4444", // red
    }

    // Create links
    const links = g
      .append("g")
      .selectAll("line")
      .data(filteredLinks)
      .enter()
      .append("line")
      .attr("stroke", "#4b5563")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.strength))

    // Create nodes
    const nodes = g
      .append("g")
      .selectAll(".node")
      .data(filteredNodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add circles for nodes
    nodes
      .append("circle")
      .attr("r", 12)
      .attr("fill", (d) => nodeColors[d.type])
      .attr("stroke", (d) => statusColors[d.status])
      .attr("stroke-width", 3)

    // Add labels for nodes
    nodes
      .append("text")
      .attr("dx", 15)
      .attr("dy", 4)
      .attr("fill", "#e5e7eb")
      .text((d) => d.name)

    // Add IP address labels
    nodes
      .append("text")
      .attr("dx", 15)
      .attr("dy", 18)
      .attr("fill", "#9ca3af")
      .attr("font-size", "0.7em")
      .text((d) => d.ip)

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const data = await fetchNetworkData()
      setNetworkData(data)
    } catch (error) {
      console.error("Error refreshing network data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 4))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.1))
  }

  const handleDownload = () => {
    if (!svgRef.current) return

    // Create a clone of the SVG
    const svgClone = svgRef.current.cloneNode(true) as SVGSVGElement

    // Set a white background
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("width", "100%")
    rect.setAttribute("height", "100%")
    rect.setAttribute("fill", "#1f2937")
    svgClone.insertBefore(rect, svgClone.firstChild)

    // Convert SVG to a data URL
    const svgData = new XMLSerializer().serializeToString(svgClone)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    // Create a link and trigger download
    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = "network_map.svg"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Network Map</h2>
          <p className="text-gray-400">Interactive visualization of network topology</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Search</CardTitle>
              <CardDescription className="text-gray-400">Filter by hostname or IP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="search" className="text-gray-300">
                  Search term
                </Label>
                <Input
                  id="search"
                  placeholder="e.g. server1 or 192.168.1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-300">Server</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-gray-300">Router</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-300">Workstation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-gray-300">Firewall</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-gray-300">Unknown</span>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-700 border-2 border-emerald-500 mr-2"></div>
                    <span className="text-gray-300">Online</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-500 mr-2"></div>
                    <span className="text-gray-300">Offline</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full bg-gray-700 border-2 border-red-500 mr-2"></div>
                    <span className="text-gray-300">Vulnerable</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="bg-gray-800/50 border-gray-700 h-[600px]">
            <CardContent className="p-0 h-full">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
              ) : (
                <svg ref={svgRef} className="w-full h-full"></svg>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

