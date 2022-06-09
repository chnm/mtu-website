mapboxgl.accessToken = "pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg";

const map = new mapboxgl.Map({
  container: "visualization",
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-77.30871, 38.830272],
  zoom: 14,
});

// disable map zoom when using scroll
map.scrollZoom.disable();

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// build a year array between 1964 and 2007
const years = [];
for (let i = 1960; i <= 2021; i++) {
  years.push(i);
}

map.on("style.load", () => {
  // load geojson data
  map.addSource("gmu", {
    type: "geojson",
    data: "gmu-footprints.geojson",
  });

  map.addLayer({
    id: "footprints",
    type: "fill",
    source: "gmu",
    layout: {},
    paint: {
      "fill-color": "rgba(195, 60, 84, 1)",
      "fill-opacity": 0.8,
    },
  });

  // Show the name of the polygon on click
  map.on('click', 'footprints', (e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    // parse the date property and get the year
    // .setHTML(`<p>e.features[0].properties.NAME <br/> Construction date: ${e.features[0].properties.date.substring(0, 4)}</p>`)
    .setHTML(e.features[0].properties.NAME + "<br> Year constructed: " + e.features[0].properties.START_DATE.substring(0, 4))
    .addTo(map);
    });

  // Change the cursor to a pointer when
  // the mouse is over the states layer.
  map.on('mouseenter', 'footprints', () => {
    map.getCanvas().style.cursor = 'crosshair';
  });

  // Change the cursor back to a pointer
  // when it leaves the states layer.
  map.on('mouseleave', 'footprints', () => {
    map.getCanvas().style.cursor = '';
    });

  // When the year value is changed, update the map with the building footprints
  // for the selected year and all previous years. In the geojson data, the year 
  // is stored in the START_DATE and END_DATE property.
  const yearSelect = document.getElementById("year-slider");
  yearSelect.addEventListener("change", () => {
    const year = yearSelect.valueAsNumber;
    // append -01-01 to the year to get the start date
    const yearStart = `${year}-01-01`;
    // append -12-31 to the year to get the end date
    const yearEnd = `${year}-12-31`;

    // filter the geojson data to only include the buildings for the selected year and all previous years
    const queryFilter = [
      "all",
      ["<=", ["get", "START_DATE"], yearStart],
    ];
    map.setFilter("footprints", queryFilter);
  });
});

// Watch for the year-slider to change and update the 
// year-range label with the value. 
document.getElementById('year-slider').addEventListener('change', function(e) {
  document.getElementById('year-range').innerHTML = e.target.value;
});
