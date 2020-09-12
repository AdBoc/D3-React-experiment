import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {gpuData} from '../data';

function GraphicsCardChart() {
  const chartRef = useRef(null);

  const margin = {top: 20, right: 20, bottom: 20, left: 20};
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([4000, 15000])
    .range([0, width]);
  const yScale = d3.scaleLinear()
    .domain([0, 7000])
    .range([height, 0]);

  function xAxis(g: any) {
    g.attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .call((g: any) => g.append("text")
        .attr("x", width - 2)
        .attr("y", -5)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("3D Mark Score"));
  }

  function yAxis(g: any) {
    g.attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(yScale))
      .call((g: any) => g.append("text")
        .attr("x", 2)
        .attr("y", -5)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(90)")
        .text("Price (usd)"));
  }

  const xGrid = d3.axisBottom(xScale)
    .tickSize(height)
    .tickFormat('' as any)
    .ticks(12);

  const yGrid = d3.axisLeft(yScale)
    .tickSize(-width)
    .tickFormat('' as any)
    .ticks(12);

  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  useEffect(() => {
    d3.select(chartRef.current)
      .append('g')
      .attr('class', 'axis-grid')
      .call(xGrid);

    d3.select(chartRef.current)
      .append('g')
      .attr('class', 'axis-grid')
      .call(yGrid);

    d3.select(chartRef.current)
      .append('g')
      .call(xAxis);

    d3.select(chartRef.current)
      .append('g')
      .call(yAxis);

    d3.select(chartRef.current)
      .selectAll("circle")
      .data(gpuData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 2)
      .attr("fill", function (d) {
        if (d.nvidia) return "green"
        return "red"
      })
      .on("mouseover", function (event) {
        // @ts-ignore
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        // @ts-ignore
        tooltip.html(event.target.__data__.label + "<br/> (" + event.target.__data__.x
          // @ts-ignore
          + ", " + event.target.__data__.y + "$)")
          // @ts-ignore
          .style("left", (event.pageX + 5) + "px")
          // @ts-ignore
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  });

  return (
    <div className="project">
      <p>TOP 20 GPUs</p>
      <p>Hover over points to see details</p>
      <p>Data comes from: <a href="https://benchmarks.ul.com/compare/best-gpus" target="_blank" rel="noopener noreferrer">benchmarks.ul.com/compare/best-gpus</a></p>
      <div className="chart">
        <svg ref={chartRef} viewBox={`0 0 ${width} ${height}`}/>
      </div>
    </div>
  )
}

export default GraphicsCardChart;
// viewBox={`0 0 ${width} ${height}`} // width={width} height={height} use instead of viewBox
