const width = 960;
const height = 600;

// Define your data
const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const links = [
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
  { source: 5, target: 1 },
];

// Create the SVG
const svg = d3.select("svg").attr("width", width).attr("height", height);

// Define arrow markers for graph links
svg
  .append("defs")
  .append("marker")
  .attr("id", "arrowhead")
  .attr("viewBox", "-0 -5 10 10")
  .attr("refX", 13)
  .attr("refY", 0)
  .attr("orient", "auto")
  .attr("markerWidth", 13)
  .attr("markerHeight", 13)
  .attr("xoverflow", "visible")
  .append("svg:path")
  .attr("d", "M 0,-5 L 10 ,0 L 0,5")
  .attr("fill", "#999")
  .style("stroke", "none");

// Create the force simulation
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3.forceLink(links).id((d) => d.id)
  )
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(960 / 2, 600 / 2));

// Create the link lines
const link = svg
  .append("g")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("marker-end", "url(#arrowhead)")
  .style("stroke", "#999")
  .style("stroke-opacity", 0.6)
  .style("stroke-width", (d) => Math.sqrt(d.value));

// Create the nodes
const node = svg
  .append("g")
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 10)
  .style("fill", "#69b3a2")
  .call(drag(simulation));

// Update the simulation based on the state of the nodes and links
simulation.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
});

// Define the drag behavior
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
