mapboxgl.accessToken = "pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg";

const map = new mapboxgl.Map({
  container: "visualization",
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-76.305456, 36.885370],
  zoom: 14,
});

// disable map zoom when using scroll
map.scrollZoom.disable();

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// build a year array between 1930 and 2021
const years = [];
for (let i = 1930; i <= 2022; i++) {
  years.push(i);
}

map.on("style.load", () => {
  // load geojson data
  map.addSource("odu", {
    type: "geojson",
    data: "odu-footprints.geojson",
  });

  map.addLayer({
    id: "footprints",
    type: "fill",
    source: "odu",
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
    .setHTML(`<strong>${e.features[0].properties.namechange ? `${e.features[0].properties.namechange}</strong><br> Previously known as: ${e.features[0].properties.name}` : e.features[0].properties.name}</strong>
              <br/> Year constructed: ${e.features[0].properties.START_DATE.substring(0, 4)}`)
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
    const yearStart = `${year}`;
    const yearEnd = `${year}`;

    const queryFilter = [
      "all",
      ["<=", ["get", "START_DATE"], yearStart],
      [">=", ["get", "END_DATE"], yearEnd],
    ];
    map.setFilter("footprints", queryFilter);
  });

    // Animating the year slider and map
  const playButton = document.getElementById("playTimeline");
  let timer = null;

  // update the slider and map
  function yearUpdate() {
    const year = yearSelect.valueAsNumber;
    yearSelect.value = year + 1;
    yearSelect.dispatchEvent(new Event("change"));
  }

  // to handle pausing, we either set timer to null (if paused) or set it to a timer
  function setTimer() {
    if (timer) {
      playButton.innerHTML = "Play";
      clearInterval(timer);
      timer = null;
    } else {
      playButton.innerHTML = "Pause";
      timer = setInterval(yearUpdate, 1000);
    }
    return false;
  }

  // watch for a user to select "play" or "pause"
  playButton.addEventListener("click", () => {
    setTimer();
  });

  // When the 'reset' button is pressed (.resetTimeline), the year slider will reset to the default map view.
  const resetTimeline = document.getElementById("resetTimeline");
  resetTimeline.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    yearSelect.value = 1930;
    document.getElementById('year-range').innerHTML = "1930-2022";
    playButton.innerHTML = "Play";
    // reset mapbox filters to show all buildings
    map.setFilter("footprints", ["all"]);
  });
});

// Watch for the year-slider to change and update the 
// year-range label with the value. 
document.getElementById('year-slider').addEventListener('change', function(e) {
  document.getElementById('year-range').innerHTML = e.target.value;
});
