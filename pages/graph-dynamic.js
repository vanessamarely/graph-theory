// Initial data
let nodes = [{ id: 0 }, { id: 1 }];
let links = [];

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
    .attr("r", 10)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

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
}

// Function to add a node
function addNode() {
    let newNode = { id: nodes.length };
    nodes.push(newNode);

    // Update the force layout
    force.nodes(nodes);

    // Add the new node to the SVG
    node = node.data(nodes);
    node.enter().append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Restart the force layout
    force.alpha(1).restart();
}

// Function to start dragging
function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
    let newLink = { source: d, target: d };
    links.push(newLink);
    link = link.data(links);
    link.enter().append("line")
        .attr("class", "link");
}

// Function to drag
function dragged(d) {
    let coords = d3.mouse(this);
    d.x = coords[0];
    d.y = coords[1];
    tick();
}

// Function to end dragging
function dragended(d) {
    d3.select(this).classed("dragging", false);
    let coords = d3.mouse(this);
    let target = nodes.find(node => Math.hypot(node.x - coords[0], node.y - coords[1]) < 10);
    if (target) {
        links[links.length - 1].target = target;
    } else {
        links.pop();
    }
    link = link.data(links);
    link.exit().remove();
    tick();
}

// Create a button to add a node
d3.select("body").append("button")
    .text("Add Node")
    .on("click", addNode);