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

const header = d3.select("#table").append("thead");
const body = d3.select("#table").append("tbody");

const headerTR = header.append("tr");
headerTR.append("th").text("Name");
headerTR.append("th").text("Hardness");
headerTR.append("th").text("Color");

const dataTbody = body.selectAll("tr").data(data);
const bodyTr = dataTbody.enter().append("tr");

function getName(value) {
  return value.name;
}

function getHardness(value) {
  return value.hardness;
}

function getColor(value) {
  return value.color;
}

bodyTr.append("td").text(getName);
bodyTr.append("td").text(getHardness);
bodyTr.append("td").text(getColor).style("color", getColor);
