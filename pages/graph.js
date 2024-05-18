const width = 960;
const height = 600;

const svg = d3.select("svg");

const simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3
      .forceLink()
      .id((d) => d.id)
      .distance(100)
  )
  .force("charge", d3.forceManyBody().strength(-400))
  .force("center", d3.forceCenter(width / 2, height / 2));

const graph = {
  nodes: [
    { id: "Sensor 1", group: 1 },
    { id: "Sensor 2", group: 1 },
    { id: "Sensor 3", group: 1 },
    { id: "Sensor 4", group: 1 },
    { id: "Sensor 5", group: 1 },
  ],
  links: [
    { source: "Sensor 1", target: "Sensor 2" },
    { source: "Sensor 2", target: "Sensor 3" },
    { source: "Sensor 3", target: "Sensor 4" },
    { source: "Sensor 4", target: "Sensor 1" },
    { source: "Sensor 5", target: "Sensor 1" },
  ],
};

const link = svg
  .append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter()
  .append("line")
  .attr("class", "link");

const node = svg
  .append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(graph.nodes)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("r", 10)
  .call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

node.append("title").text((d) => d.id);

simulation.nodes(graph.nodes).on("tick", ticked);

simulation.force("link").links(graph.links);

function ticked() {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
}

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// Simulate data update
function updateData() {
  graph.nodes.forEach((node) => {
    node.group = Math.floor(Math.random() * 2) + 1; // Randomly change group
  });

  node.attr("fill", (d) => (d.group === 1 ? "red" : "blue"));
}

// Update data every 2 seconds
setInterval(updateData, 20000);
