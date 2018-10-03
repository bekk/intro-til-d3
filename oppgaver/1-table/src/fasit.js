const data = [
  { name: "diamond", hardness: 10, color: "white" },
  { name: "ruby", hardness: 9, color: "red" },
  { name: "sapphire", hardness: 9, color: "blue" },
  { name: "topaz", hardness: 8, color: "yellow" },
  { name: "emerald", hardness: 7.5, color: "green" },
  { name: "amethyst", hardness: 7, color: "purple" },
  { name: "opal", hardness: 6, color: "black" }
];

// Entrypoint for d3
const headerTR = d3.select("#table").append("thead");

headerTR.append("th").text("Name");

headerTR.append("th").text("Hardness");

headerTR.append("th").text("Color");

const dataTbody = d3
  .select("#table")
  .append("tbody")
  .selectAll("tr")
  .data(data);

const dataTR = dataTbody.enter().append("tr");

dataTR.append("td").text((d, i) => d.name);

const numberFormat = d3.format(".1f");

dataTR
  .append("td")
  .attr("class", "number")
  .text((d, i) => numberFormat(d.hardness));

dataTR
  .append("td")
  .attr("style", (d, i) => `color: ${d.color}`)
  .text((d, i) => d.color);
