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
