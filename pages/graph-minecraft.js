// Define the data for the nodes and links
let nodes = [
    { id: "Forest", color: "green" },
    { id: "Mine", color: "gray" },
    { id: "House", color: "brown" },
    { id: "Lake", color: "blue" }
];

let links = [
    { source: "Forest", target: "Mine" },
    { source: "Mine", target: "House" },
    { source: "House", target: "Forest" },
    { source: "Lake", target: "Forest" },
    { source: "Lake", target: "House" }
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
    .attr("r", 20)
    .style("fill", function(d) { return d.color; });

// Create the node labels
let label = svg.selectAll(".label")
    .data(nodes)
    .enter().append("text")
    .attr("class", "label")
    .text(function(d) { return d.id; });

// Create the force layout
let force = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(function(d) { return d.id; }).distance(200))
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

    label.attr("x", function(d) { return d.x; })
         .attr("y", function(d) { return d.y; });
}