<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-green-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          <strong>Mapping the University</strong>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" label="Home" />
        <q-route-tab to="/maps" label="Maps" />
        <q-route-tab to="/data" label="Data" />
        <q-route-tab to="/about" label="About" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />

        <div id="map" />

    </q-page-container>

    <q-footer bordered class="bg-grey-1 text-black">
      <q-toolbar>
        <q-toolbar-title>
            <div class="logos">
                <a href="https://rrchnm.org/"><img class="rrchnm-logo" src="https://religiousecologies.org/img/rrchnm-logo.png" alt="Roy Rosenzweig Center for History and New Media logo"></a>
                <a href="https://www2.gmu.edu/"><img class="gmu-logo" src="https://religiousecologies.org/img/gmu-logo.png" alt="George Mason University logo"></a>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
import { createApp, defineComponent, nextTick } from "vue";
import MapPopupContent from "@/components/MapPopupContent.vue";

export default {
    setup() {
        onMounted(() => { 
            mapboxgl.accessToken = 'pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg'

            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-77.311526, 38.829599],
                zoom: 15
            });
            map.on('load', () => {
                // load a layer 
                map.addSource('gmu', {
                    type: 'geojson',
                    data: 'gmufootprints.geojson'
                });
                map.addLayer({
                    id: 'footprints',
                    type: 'fill',
                    source: 'gmu',
                    layout: {},
                    paint: {
                        'fill-color': 'brown',
                        'fill-opacity': 0.8
                    }
                });

                // load popover 
                map.on("click", "footprints", function (e) {
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML('<div id="popup-content"></div>')
                        .addTo(map);
                    
                    const popupContent = defineComponent({
                        extends: MapPopupContent,
                        setup() {
                            const features = map.querySourceFeatures('gmu');
                            console.log('features', features.properties);
                            const title = features[0].properties.NAME;
                            return { title }
                        },
                    })
                    nextTick(() => {
                        createApp(popupContent).mount("#popup-content")
                    })
                });
            });
        });
        return {};
    },
};
</script>

<style>
#map {
    height: 100vh;
}
</style>