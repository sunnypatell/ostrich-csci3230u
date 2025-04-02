"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface SecurityPostureChartProps {
  timeRange: string
}

export default function SecurityPostureChart({ timeRange }: SecurityPostureChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Generate sample data based on time range
    const data = generateData(timeRange)

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // X scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width])

    // Y scale
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0])

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#9ca3af")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y)).selectAll("text").attr("fill", "#9ca3af")

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

    // Add security score zones
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", y(100))
      .attr("width", width)
      .attr("height", y(80) - y(100))
      .attr("fill", "#10b981")
      .attr("opacity", 0.1)

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", y(80))
      .attr("width", width)
      .attr("height", y(60) - y(80))
      .attr("fill", "#3b82f6")
      .attr("opacity", 0.1)

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", y(60))
      .attr("width", width)
      .attr("height", y(40) - y(60))
      .attr("fill", "#eab308")
      .attr("opacity", 0.1)

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", y(40))
      .attr("width", width)
      .attr("height", y(0) - y(40))
      .attr("fill", "#ef4444")
      .attr("opacity", 0.1)

    // Add zone labels
    svg.append("text").attr("x", 5).attr("y", y(90)).attr("fill", "#10b981").attr("font-size", "12px").text("Excellent")

    svg.append("text").attr("x", 5).attr("y", y(70)).attr("fill", "#3b82f6").attr("font-size", "12px").text("Good")

    svg.append("text").attr("x", 5).attr("y", y(50)).attr("fill", "#eab308").attr("font-size", "12px").text("Fair")

    svg.append("text").attr("x", 5).attr("y", y(20)).attr("fill", "#ef4444").attr("font-size", "12px").text("Poor")

    // Define line generator
    const line = d3
      .line<any>()
      .x((d) => x(d.date))
      .y((d) => y(d.score))
      .curve(d3.curveMonotoneX)

    // Add the line
    const path = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 3)
      .attr("d", line)

    // Animate the line
    const pathLength = (path.node() as SVGPathElement).getTotalLength()

    path
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)

    // Add dots
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.score))
      .attr("r", 0)
      .attr("fill", (d) => {
        if (d.score >= 80) return "#10b981"
        if (d.score >= 60) return "#3b82f6"
        if (d.score >= 40) return "#eab308"
        return "#ef4444"
      })
      .transition()
      .delay((_, i) => 2000 + i * 150)
      .duration(500)
      .attr("r", 5)

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "#1f2937")
      .style("color", "#e5e7eb")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000)

    // Add hover effects
    svg
      .selectAll(".dot-hover")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-hover")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.score))
      .attr("r", 10)
      .attr("fill", "transparent")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9)

        let scoreCategory
        if (d.score >= 80) scoreCategory = "Excellent"
        else if (d.score >= 60) scoreCategory = "Good"
        else if (d.score >= 40) scoreCategory = "Fair"
        else scoreCategory = "Poor"

        tooltip
          .html(`
          <strong>Date:</strong> ${d.date.toLocaleDateString()}<br>
          <strong>Score:</strong> ${d.score}/100<br>
          <strong>Status:</strong> ${scoreCategory}
        `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0)
      })

    // Clean up tooltip on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [timeRange])

  // Generate sample data based on time range
  const generateData = (range: string) => {
    let days
    let interval

    switch (range) {
      case "7d":
        days = 7
        interval = 1
        break
      case "90d":
        days = 90
        interval = 5
        break
      case "1y":
        days = 365
        interval = 15
        break
      case "30d":
      default:
        days = 30
        interval = 2
        break
    }

    const data = []
    const now = new Date()

    // Start with a baseline score
    let score = 65

    for (let i = days; i >= 0; i -= interval) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Add some random variation but with an overall improving trend
      const randomChange = Math.random() * 6 - 2 // Random between -2 and 4
      const trendImprovement = ((days - i) / days) * 15 // Gradually improve over time

      score = Math.min(98, Math.max(40, score + randomChange + (trendImprovement / days) * interval))

      // Add some specific events
      if (i === Math.floor(days * 0.7)) {
        // Security incident
        score -= 15
      } else if (i === Math.floor(days * 0.5)) {
        // Security improvements implemented
        score += 10
      } else if (i === Math.floor(days * 0.2)) {
        // Security audit
        score += 5
      }

      // Round to integer
      score = Math.round(score)

      data.push({ date, score })
    }

    return data
  }

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

