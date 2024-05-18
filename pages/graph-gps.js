// Define tus datos
// Estas son coordenadas GPS hipotéticas para la ruta
const pathData = [
  { lat: 40.7128, lon: -74.006, label: "New York" }, // New York
  { lat: 39.9526, lon: -75.1652, label: "Philadelphia" }, // Philadelphia
  { lat: 38.9072, lon: -77.0369, label: "Washington, D.C." }, // Washington, D.C.
  { lat: 34.0522, lon: -118.2437, label: "Los Angeles" }, // Los Angeles
  { lat: 37.7749, lon: -122.4194, label: "San Francisco" }, // San Francisco
  { lat: 47.6062, lon: -122.3321, label: "Seattle" }, // Seattle
  { lat: 41.8781, lon: -87.6298, label: "Chicago" }, // Chicago
  { lat: 29.7604, lon: -95.3698, label: "Houston" }, // Houston
  { lat: 32.7767, lon: -96.797, label: "Dallas" }, // Dallas
  { lat: 39.7392, lon: -104.9903, label: "Denver" }, // Denver
  { lat: 40.4406, lon: -79.9959, label: "Pittsburgh" }, // Pittsburgh
  { lat: 42.3601, lon: -71.0589, label: "Boston" }, // Boston
  { lat: 45.5051, lon: -122.675, label: "Portland" }, // Portland
  { lat: 33.4484, lon: -112.074, label: "Phoenix" }, // Phoenix
  { lat: 36.1699, lon: -115.1398, label: "Las Vegas" }, // Las Vegas
  { lat: 35.2271, lon: -80.8431, label: "Charlotte" }, // Charlotte
  { lat: 30.2672, lon: -97.7431, label: "Austin" }, // Austin
  { lat: 32.7157, lon: -117.1611, label: "San Diego" }, // San Diego
  { lat: 38.5816, lon: -121.4944, label: "Sacramento" }, // Sacramento
  { lat: 35.0844, lon: -106.6506, label: "Albuquerque" }, // Albuquerque
  { lat: 21.3069, lon: -157.8583, label: "Honolulu" }, // Honolulu
  { lat: 61.2181, lon: -149.9003, label: "Anchorage" }, // Anchorage
  { lat: 64.2008, lon: -149.4937, label: "Fairbanks" }, // Fairbanks
  { lat: 58.3019, lon: -134.4197, label: "Juneau" }, // Juneau
];

const width = 960;
const height = 600;

// Crea el SVG
const svg = d3.select("svg").attr("width", width).attr("height", height);

// Crea una proyección para convertir las coordenadas GPS en coordenadas de pantalla
const projection = d3
  .geoMercator()
  .scale(150)
  .translate([width / 2, height / 1.5]);

// Dibuja la ruta
const lineGenerator = d3
  .line()
  .x((d) => projection([d.lon, d.lat])[0])
  .y((d) => projection([d.lon, d.lat])[1]);

svg
  .append("path")
  .datum(pathData)
  .attr("d", lineGenerator)
  .style("stroke", "#ff0000")
  .style("stroke-width", 2)
  .style("fill", "none");

// Add labels
svg
  .selectAll("text")
  .data(pathData)
  .enter()
  .append("text")
  .attr("x", (d) => projection([d.lon, d.lat])[0] + 10)
  .attr("y", (d) => projection([d.lon, d.lat])[1] - 10)
  .text((d) => d.label)
  .style("font-size", "9px")
  .style("fill", "#000000");

// Add circles to represent the cities
svg
  .selectAll("circle")
  .data(pathData)
  .enter()
  .append("circle")
  .attr("cx", (d) => projection([d.lon, d.lat])[0])
  .attr("cy", (d) => projection([d.lon, d.lat])[1])
  .attr("r", 3)
  .style("fill", "#000000");