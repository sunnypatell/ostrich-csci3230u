"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export default function ThreatActivityChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Sample data - in a real app, this would come from an API
    const data = [
      { date: "2023-04-01", count: 12 },
      { date: "2023-04-02", count: 19 },
      { date: "2023-04-03", count: 15 },
      { date: "2023-04-04", count: 25 },
      { date: "2023-04-05", count: 32 },
      { date: "2023-04-06", count: 18 },
      { date: "2023-04-07", count: 24 },
    ]

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.2)

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .nice()
      .range([height, 0])

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          const date = new Date(d as string)
          return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        }),
      )
      .selectAll("text")
      .attr("fill", "#9ca3af") // text color
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y)).selectAll("text").attr("fill", "#9ca3af") // text color

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => ""),
      )
      .selectAll("line")
      .attr("stroke", "#374151")
      .attr("stroke-opacity", 0.3)

    // Create gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#10b981")

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#059669")

    // Add bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.date) || 0)
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "url(#bar-gradient)")
      .attr("rx", 2) // rounded corners
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => height - y(d.count))

    // Add line
    const line = d3
      .line<{ date: string; count: number }>()
      .x((d) => (x(d.date) || 0) + x.bandwidth() / 2)
      .y((d) => y(d.count))
      .curve(d3.curveMonotoneX)

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("stroke-dasharray", function () {
        const length = (this as SVGPathElement).getTotalLength()
        return `${length} ${length}`
      })
      .attr("stroke-dashoffset", function () {
        return (this as SVGPathElement).getTotalLength()
      })
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0)

    // Add dots
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => (x(d.date) || 0) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.count))
      .attr("r", 0)
      .attr("fill", "#10b981")
      .transition()
      .delay((_, i) => i * 150)
      .duration(500)
      .attr("r", 4)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

