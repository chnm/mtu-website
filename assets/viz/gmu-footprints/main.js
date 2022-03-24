// import * from "d3";
// import Visualization from "../common/visualization";
// import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg";

const map = new mapboxgl.Map({
  container: "visualization",
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-77.308710, 38.830272],
  zoom: 15,
});

// disable map zoom when using scroll
map.scrollZoom.disable();

map.on("load", () => {
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
            zoom: zoom
        });
    }
    );
});



// const animateTo = (e) => {
//     const span = e.target;
//     const zoom = span.dataset.zoom;
//     const lat = span.dataset.lat;
//     const lon = span.dataset.lon;
//     map.flyTo({
//         center: [lon, lat],
//         // if no zoom is given, use the current zoom level
//         zoom: zoom || map.getZoom(),
//         // duration of the animation in milliseconds
//         duration: 1000,
//     });
// }


// function animateTo(lat, lon, zoom) {
//     map.flyTo({
//         center: [lon, lat],
//         // if no zoom is given, use the current zoom level
//         zoom: zoom || map.getZoom(),
//         // duration of the animation in milliseconds
//         duration: 1000,
//     });
// }
