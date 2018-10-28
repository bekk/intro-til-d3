const color = (d, i) => `hsl(32, 100%, ${(d.value / 20 + 0.3) * 100}%)`;
const xCoord = (d, i) => 60 + i * 60;
const radius = (d, i) => 5 + d.value * 2.5;

const t = d3.transition().duration(200);

// JOIN: bind elementer til data
const circles = d3
  .select("#svg")
  .selectAll("circle")
  .data(data, d => d.name);

// ENTER: opprett nye elementer når nye data
circles
  .enter()
  .append("circle")
  .style("fill", color)
  .attr("cx", xCoord)
  .attr("cy", height / 2)
  .attr("r", 0)
  .transition(t)
  .attr("r", radius);

// UPDATE: oppdater elementer iht endret data
circles
  .transition(t)
  .attr("r", radius)
  .attr("cx", xCoord)
  .style("fill", color);

// EXIT: fjern elementer uten tilhørende data
circles
  .exit()
  .transition(t)
  .attr("r", 0)
  .remove();

// join, enter, update, exit for tekster:

const text = d3
  .select("#svg")
  .selectAll("text")
  .data(data, d => d.name);

text
  .enter()
  .append("text")
  .text((d, i) => d.name)
  .attr("x", xCoord)
  .attr("text-anchor", "middle")
  .attr("y", height / 2 - 40);

text.transition(t).attr("x", xCoord);

text.exit().remove();
