const g = select(svg).append("g");

var circlePacking = pack()
    .size([width, height])
    .padding(10);

const root = hierarchy(data)
    .count()
    .sort((a, b) => b.value - a.value);

var node = g.selectAll(".node")
  .data(circlePacking(root).descendants())
  .enter().append("g")
    .attr("class", (d, i) => d.children ? "node" : "leaf node")
    .attr("transform", (d, i) => "translate(" + d.x + "," + d.y + ")");

node.append("circle")
    .attr("r", (d, i) => d.r);

node.append("text")
    .attr("dy", (d, i) => d.children ? `${-d.r/20}rem` : "0")
    .text((d, i) => d.data.name);