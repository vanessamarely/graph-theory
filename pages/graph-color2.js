// Define the data for the nodes and links
let nodes = [
    { id: "Forest" },
    { id: "Mine" },
    { id: "House" },
    { id: "Lake" }
];

let links = [
    { source: "Forest", target: "Mine" },
    { source: "Mine", target: "House" },
    { source: "House", target: "Forest" },
    { source: "Lake", target: "Forest" },
    { source: "Lake", target: "House" }
];

// Define the available colors
let colors = ["red", "green", "blue", "yellow"];

// Assign a color to each node
nodes.forEach(node => {
    let adjacentNodeColors = links
        .filter(link => link.source === node.id || link.target === node.id)
        .map(link => link.source === node.id ? nodes.find(n => n.id === link.target).color : nodes.find(n => n.id === link.source).color)
        .filter(color => color !== undefined);

    node.color = colors.find(color => !adjacentNodeColors.includes(color));
});

// Create the SVG
let svg = d3.select("body").append("svg")
    .attr("width", 800)
    .attr("height", 600);

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