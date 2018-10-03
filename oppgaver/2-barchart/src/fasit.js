const data = [5, 10, 1, 3, 2, 1, 4, 2, 7];

const dataMax = d3.max(data);
const width = 500;
const height = 500;

d3.select("#svg").style("background-color", "#d1d1d1");

// Legger til et rect for hvert element i data
const graph = d3
  .select("#svg")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect");

const barWidth = 50;
const barMargin = 2;

const yScale = d3
  .scaleLinear()
  .domain([0, dataMax])
  .range([0, height]);

// Legger til søyler
graph
  .style("fill", (d, i) => (i % 2 ? "#3d3d3d" : "#fe9922"))
  .attr("x", (d, i) => 10 + i * (barWidth + barMargin))
  .attr("y", d => height - yScale(d))
  .attr("height", d => yScale(d))
  .attr("width", barWidth)

const yScaleInverted = yScale.copy().range([height, 0]);
const yAxis = d3.axisLeft(yScaleInverted);

d3
  .select("#svg")
  .append("g")
  .attr("transform", `translate(${-barMargin}, 0)`)
  .call(yAxis);
