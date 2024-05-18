// Define the data for the nodes and links
let nodes = [
    { id: 0, color: "red" },
    { id: 1, color: "blue" },
    { id: 2, color: "green" },
    { id: 3, color: "yellow" },
    { id: 4, color: "red" }
];

let links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 0 },
    { source: 0, target: 4 },
    { source: 1, target: 4 },
    { source: 2, target: 4 },
    { source: 3, target: 4 }
];

// Create the SVG
const svg = d3.select("svg");

// Create the link lines
let link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

// Create the node circles
let node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function(d) { return d.color; });

    // Create the node labels
let label = svg.selectAll(".label")
    .data(nodes)
    .enter().append("text")
    .attr("class", "label")
    .text(function(d) { return d.id; });


// Create the force layout
let force = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).distance(200))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(400, 300))
    .on("tick", tick);

// Function to update the graph
function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        label
          .attr("x", function (d) {
            return d.x;
          })
          .attr("y", function (d) {
            return d.y;
          });
}