// Define your data
const nodes = [
  { id: "Computer 1" },
  { id: "Computer 2" },
  { id: "Computer 3" },
  { id: "Computer 4" },
  { id: "Computer 5" },
];

const links = [
  { source: "Computer 1", target: "Computer 2" },
  { source: "Computer 2", target: "Computer 3" },
  { source: "Computer 3", target: "Computer 4" },
  { source: "Computer 4", target: "Computer 5" },
  { source: "Computer 5", target: "Computer 1" },
];

const width = 960;
const height = 600;

// Crea el SVG
const svg = d3.select("svg").attr("width", width).attr("height", height);

// Create the force simulation
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3.forceLink(links).id((d) => d.id)
  )
  .force("charge", d3.forceManyBody())
  .force(
    "center",
    d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2)
  );

// Draw the links
const link = svg
  .append("g")
  .selectAll("line")
  .data(links)
  .join("line")
  .style("stroke", "#999")
  .style("stroke-opacity", 0.6)
  .style("stroke-width", (d) => Math.sqrt(d.value));


// Draw the nodes
const node = svg
  .append("g")
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 5)
  .style("fill", "#69b3a2");

// Add labels to the nodes
const label = svg
  .append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text((d) => d.id)
  .style("font-size", "12px")
  .attr("dx", 10)
  .attr("dy", 5);

// Update the positions of the nodes and links on each tick of the simulation
simulation.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  label.attr("x", (d) => d.x).attr("y", (d) => d.y);
});

// Enable dragging of the nodes
function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

node.call(drag(simulation));
