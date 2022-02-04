<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-green-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
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

    <q-drawer 
      :width="450" 
      show-if-above 
      v-model="leftDrawerOpen"
      side="left" 
      elevated
    >
      <div class="narrative">
        <h3>Introduction</h3>
        <p>Whatever put a bird on it cray pour-over selfies tbh, yr man bun kickstarter <a href="">messenger bag ramps pickled</a> gentrify everyday carry meggings. Bitters poke tote bag tumeric 3 wolf moon twee. Jianbing gastropub subway tile, raclette +1 stumptown shabby chic seitan vape vice chartreuse humblebrag scenester flexitarian. Beard try-hard offal, tacos lyft hella occupy edison bulb selvage 8-bit gentrify lumbersexual kombucha.</p>
        <p>Leggings hot chicken brunch cornhole YOLO farm-to-table master cleanse forage vinyl yuccie sustainable. <a href="">Tacos typewriter brooklyn</a>, sustainable chambray brunch cliche etsy put a bird on it adaptogen vaporware pinterest man braid cold-pressed bicycle rights. Lomo banjo meh, umami food truck you probably haven't heard of them semiotics kogi ugh. Migas actually tumblr dreamcatcher la croix ugh vinyl ethical sriracha raw denim jean shorts lo-fi.</p>
        
        <div class="q-pa-md">
            <q-img
              src="./assets/images/AerialViewCampus-1960-1969.jpg"
              :fit="fill"
            >
            <template v-slot:loading>
              <div class="text-subtitle1 text-black">
                Loading...
              </div>
            </template>
            </q-img>
        </div>

        <p>Cronut ennui tote bag, before they sold out kitsch vinyl hashtag swag ugh poutine vice activated charcoal. Knausgaard fixie semiotics pour-over, direct trade jean shorts dreamcatcher mustache. Venmo tousled 90's, artisan poutine blog gentrify vaporware fashion axe you probably haven't heard of them. Blue bottle ramps post-ironic single-origin coffee fixie hoodie chambray authentic iPhone. Sustainable literally pabst af. Asymmetrical umami deep v selfies enamel pin.</p>
        
        <h4>Subtitle</h4>
        <p>Occupy tumeric hashtag, next level health goth PBR&B meditation. Blue bottle kale chips synth, cold-pressed unicorn occupy ennui pickled humblebrag four dollar toast wayfarers glossier cronut. Banjo subway tile 8-bit fam. Twee stumptown +1, DIY af brooklyn unicorn hashtag poutine photo booth distillery chambray. Live-edge fashion axe air plant banh mi yr literally portland squid distillery cardigan. Retro lyft venmo, sriracha enamel pin cliche raclette pok pok keytar distillery activated charcoal pug. 90's man braid vape farm-to-table.</p>
      </div>
    </q-drawer>

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