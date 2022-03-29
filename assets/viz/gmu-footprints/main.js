// import * from "d3";
// import Visualization from "../common/visualization";
// import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg";

const map = new mapboxgl.Map({
  container: "visualization",
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-77.30871, 38.830272],
  zoom: 15,
});

// disable map zoom when using scroll
map.scrollZoom.disable();
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on("style.load", () => {
  // load geojson data
  map.addSource("gmu", {
    type: "geojson",
    data: "gmufootprints.geojson",
  });

  map.addLayer({
    id: "footprints",
    type: "fill",
    source: "gmu",
    layout: {},
    paint: {
      "fill-color": "brown",
      "fill-opacity": 0.8,
    },
  });
});

// Build the basemap selector and redraw the data after a user changes the basemap 
const basemapSelector = document.getElementById("menu");
basemapSelector.addEventListener("change", (e) => {
  // updateMap();
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/mapbox/" + layerId);
  };
}

// Watch for a user to click the resetView button and reset the map view
const resetView = document.getElementById("resetView");
resetView.addEventListener("click", () => {
  map.flyTo({
    center: [-77.30871, 38.830272],
    zoom: 15,
  });
});


// this function is for re-drawing the data when the basemap is changed
// const updateMap = () => {
//   map.removeSource("gmu");
//   map.addSource("gmu", {
//     type: "geojson",
//     data: "gmufootprints.geojson",
//   });

//   map.addLayer({
//     id: "footprints",
//     type: "fill",
//     source: "gmu",
//     layout: {},
//     paint: {
//       "fill-color": "brown",
//       "fill-opacity": 0.8,
//     },
//   });
// };

// We watch for a click to the .notation in the text span
// When it is clicked, the function animates to the given lat/lon coordinates using the provided
// data-zoom, data-lat, and data-lon attributes in the span
const spans = document.querySelectorAll(".notation");

spans.forEach((span) => {
  span.addEventListener("click", (e) => {
    const lat = span.dataset.lat;
    const lon = span.dataset.lon;
    const zoom = span.dataset.zoom;
    map.flyTo({
      center: [lon, lat],
      zoom: zoom,
    });
  });
});
