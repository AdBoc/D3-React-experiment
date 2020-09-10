import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const data = [
  {x: 1, y: 39343},
  {x: 2, y: 46205},
  {x: 3, y: 37731},
  {x: 4, y: 43525},
  {x: 5, y: 39891},
  {x: 6, y: 56642},
  {x: 7, y: 60150},
  {x: 8, y: 54445},
  {x: 9, y: 64445},
  {x: 10, y: 57189},
  {x: 11, y: 63218}
];

const regressionPoints = [
  {x: 1, y: 38182},
  {x: 11, y: 63218}
];

function ReactWay() {
  const chartRef = useRef(null);

  useEffect(() => {
    draw();
  });

  const draw = () => {
    const xScale = d3.scaleLinear()
      .domain([0, 15])
      .range([0, 200]);
    const yScale = d3.scaleLinear()
      .domain([0, 80000])
      .range([200, 0]);

    const xAxis = d3.axisBottom(xScale);
    d3.select(".x-axis")
      .style("transform", "translateY(200px)")
      .call(xAxis as any);

    const yAxis = d3.axisLeft(yScale);
    d3.select(".y-axis")
      .call(yAxis as any)

    d3.select(chartRef.current)
      .selectAll("circle")
      .data(data)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 2);

    const line = d3.line()
      // @ts-ignore
      .x(d => xScale(d.x))
      // @ts-ignore
      .y(d => yScale(d.y));

    d3.select(chartRef.current)
      .select(".regression-line")
      .datum(regressionPoints)
      .attr('d', line as any)
      .attr("stroke", "black")
      .attr("fill", "none");
  };

  const points = data.map(point => <circle key={point.x}/>);

  return (
    <div className="svg-container">
      <svg ref={chartRef}>
        {points}
        <path className="regression-line"/>
        <g className="x-axis"/>
        <g className="y-axis"/>
      </svg>
    </div>
  );
}

export default ReactWay;