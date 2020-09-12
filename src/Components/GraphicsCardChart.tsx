import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {gpuData} from '../data';

function GraphicsCardChart() {
  const chartRef = useRef(null);

  const width = 400;
  const height = 400;
  // const margin = {top: 20, right: 20, bottom: 20, left: 20};

  const xScale = d3.scaleLinear()
    .domain([4000, 15000]) //d3.max(gpuData, d => d.x)] as any
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
        .text("Price"));
  }

  const xGrid = d3.axisBottom(xScale)
    .tickSize(height)
    .tickFormat('' as any)
    .ticks(12);

  const yGrid = d3.axisLeft(yScale)
    .tickSize(-width)
    .tickFormat('' as any)
    .ticks(12);

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
      .attr("r", 1);
  });

  return (
    <>
      <svg ref={chartRef}/>
    </>
  )
}

export default GraphicsCardChart;
// viewBox={`0 0 ${width} ${height}`} // width={width} height={height} use instead of viewBox