"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface AttackSourcesChartProps {
  timeRange: string
}

export default function AttackSourcesChart({ timeRange }: AttackSourcesChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Sample data - in a real app, this would come from an API and change based on timeRange
    const data = [
      { country: "Russia", count: 2341 },
      { country: "China", count: 1876 },
      { country: "Ukraine", count: 1543 },
      { country: "North Korea", count: 987 },
      { country: "Iran", count: 765 },
      { country: "United States", count: 654 },
      { country: "Brazil", count: 432 },
      { country: "India", count: 321 },
      { country: "Other", count: 876 },
    ]

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left},${height / 2 + margin.top})`)

    // Color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.country))
      .range([
        "#ef4444", // red
        "#f97316", // orange
        "#eab308", // yellow
        "#10b981", // green
        "#3b82f6", // blue
        "#8b5cf6", // purple
        "#ec4899", // pink
        "#6b7280", // gray
        "#1f2937", // dark gray
      ])

    // Compute the position of each group on the pie
    const pie = d3
      .pie<any>()
      .value((d) => d.count)
      .sort(null)

    const data_ready = pie(data)

    // Build the pie chart
    const arcGenerator = d3
      .arc<any>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8)

    // Add the arcs
    const arcs = svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.country) as string)
      .attr("stroke", "#1f2937")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Add animation
    arcs
      .transition()
      .duration(1000)
      .attrTween("d", (d) => {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return (t) => arcGenerator(i(t))
      })

    // Add labels
    const labelArc = d3
      .arc<any>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    const labels = svg
      .selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#e5e7eb")
      .style("font-size", "12px")
      .style("opacity", 0)
      .text((d) => {
        const percent = Math.round((d.data.count / d3.sum(data, (d) => d.count)) * 100)
        return percent >= 5 ? `${d.data.country} (${percent}%)` : ""
      })

    labels.transition().delay(1000).duration(500).style("opacity", 1)

    // Add center text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-.5em")
      .attr("fill", "#e5e7eb")
      .style("font-size", "16px")
      .text("Attack")

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".8em")
      .attr("fill", "#e5e7eb")
      .style("font-size", "16px")
      .text("Sources")

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

    arcs
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr(
            "d",
            d3
              .arc<any>()
              .innerRadius(radius * 0.4)
              .outerRadius(radius * 0.85),
          )

        tooltip.transition().duration(200).style("opacity", 0.9)

        const percent = Math.round((d.data.count / d3.sum(data, (d) => d.count)) * 100)

        tooltip
          .html(`
        <strong>${d.data.country}</strong><br>
        Attacks: ${d.data.count}<br>
        Percentage: ${percent}%
      `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).style("opacity", 0.7).attr("d", arcGenerator)

        tooltip.transition().duration(500).style("opacity", 0)
      })

    // Clean up tooltip on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [timeRange])

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

