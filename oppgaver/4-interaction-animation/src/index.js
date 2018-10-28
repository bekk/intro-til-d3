const data = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "e" },
  { name: "f" },
  { name: "g" },
  { name: "h" },
  { name: "i" },
  { name: "j" },
  { name: "k" },
  { name: "l" },
  { name: "m" }
];

const dataMax = d3.max(data);
const width = 500;
const height = 500;

const color = (d, i) => `hsl(32, 100%, 60%)`;
const colorHover = (d, i) => `hsl(32, 100%, 80%)`;
const widthCount = 4;
const xCoord = (d, i) => 120 + (i % widthCount) * 60;
const yCoord = (d, i) => height / 2 + Math.floor(i / widthCount) * 60;

function handleMouseOver(d, i) {
  // Oppgave 1
}

function handleMouseOut(d, i) {
  // Oppgave 2
}

const circles = d3
  .select("#svg")
  .selectAll("circle")
  .data(data, d => d.name);

circles
  .enter()
  .append("circle")
  .style("fill", color)
  .attr("cx", xCoord)
  .attr("cy", yCoord)
  .attr("r", 25)
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut);

