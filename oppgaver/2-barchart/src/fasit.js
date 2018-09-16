const yScale = d3
  .scaleLinear()
  .domain([0, dataMax])
  .range([0, height]);

d3.select(svg).style("background-color", "#d1d1d1");

// Legg til et rect for hvert element i data
d3
  .select(svg)
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect");

const barWidth = 50;
const barMargin = 2;

// Legger til søyler
d3
  .select(svg)
  .selectAll("rect")
  .data(data)
  .style("fill", (d, i) => (i % 2 ? "#3d3d3d" : "#fe9922"))
  .attr("x", (d, i) => 10 + i * (barWidth + barMargin))
  .attr("y", d => height - yScale(d))
  .attr("height", d => yScale(d))
  .attr("width", barWidth)
  .attr("rx", 10)
  .attr("ry", 10);

const yScaleInverted = yScale.copy().range([height, 0]);
const yAxis = d3.axisLeft(yScaleInverted);

d3
  .select(svg)
  .append("g")
  .attr("transform", `translate(${-barMargin}, 0)`)
  .call(yAxis);
