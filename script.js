// Definir los nodos y las aristas del grafo
const nodes = [
    { id: 'Monitor' },
    { id: 'Analyze' },
    { id: 'Plan' },
    { id: 'Execute' }
];

const links = [
    { source: 'Monitor', target: 'Analyze' },
    { source: 'Analyze', target: 'Plan' },
    { source: 'Plan', target: 'Execute' },
    { source: 'Execute', target: 'Monitor' }
];

// Crear una simulación de fuerza
const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(200))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(960 / 2, 600 / 2));

// Seleccionar el SVG y establecer sus dimensiones
const svg = d3.select('svg');

// Añadir las aristas
const link = svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

// Añadir los nodos
const node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', 10)
    .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

// Añadir etiquetas a los nodos
const label = svg.append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .attr('dy', -15)
    .text(d => d.id);

// Actualizar las posiciones de los nodos y aristas en cada tick de la simulación
simulation.on('tick', () => {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
});

// Funciones de arrastre
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
