d3.select("h1").style("color", "red");

d3.selectAll("p").style("font-style", "italic");

d3.selectAll(".paragraph").style("color", "blue");

d3.select("#paragraph").style("color", "green");

d3
  .select("#paragraph2.paragraph")
  .style("font-size", "40px")
  .style("color", "orange");
