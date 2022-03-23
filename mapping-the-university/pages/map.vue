<template>
  <div>
    <v-app id="va-maps">
      <v-navigation-drawer
        :width="540"
        app
      >
        <v-card-text class="black--text blue-grey lighten-5">
          <div class="narrative">
            <h1>Introduction</h1>
            <p>Whatever put a bird on it cray pour-over selfies tbh, yr man bun kickstarter <a href="">messenger bag ramps pickled</a> gentrify everyday carry meggings. Bitters poke tote bag tumeric 3 wolf moon twee. Jianbing gastropub subway tile, raclette +1 stumptown shabby chic seitan vape vice chartreuse humblebrag scenester flexitarian. Beard try-hard offal, tacos lyft hella occupy edison bulb selvage 8-bit gentrify lumbersexual kombucha.</p>
            <p>Leggings hot chicken brunch cornhole YOLO farm-to-table master cleanse forage vinyl yuccie sustainable. <a href="">Tacos typewriter brooklyn</a>, sustainable chambray brunch cliche etsy put a bird on it adaptogen vaporware pinterest man braid cold-pressed bicycle rights. Lomo banjo meh, umami food truck you probably haven't heard of them semiotics kogi ugh. Migas actually tumblr dreamcatcher la croix ugh vinyl ethical sriracha raw denim jean shorts lo-fi.</p>

            <div class="q-pa-md">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                src="https://picsum.photos/id/11/500/300"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
              <div :class="text-caption">
                Sample caption for the image.
              </div>
            </div>

            <p>Cronut ennui tote bag, before they sold out kitsch vinyl hashtag swag ugh poutine vice activated charcoal. Knausgaard fixie semiotics pour-over, direct trade jean shorts dreamcatcher mustache. Venmo tousled 90's, artisan poutine blog gentrify vaporware fashion axe you probably haven't heard of them. Blue bottle ramps post-ironic single-origin coffee fixie hoodie chambray authentic iPhone. Sustainable literally pabst af. Asymmetrical umami deep v selfies enamel pin.</p>

            <h2>Subtitle</h2>
            <p>Occupy tumeric hashtag, next level health goth PBR&B meditation. Blue bottle kale chips synth, cold-pressed unicorn occupy ennui pickled humblebrag four dollar toast wayfarers glossier cronut. Banjo subway tile 8-bit fam. Twee stumptown +1, DIY af brooklyn unicorn hashtag poutine photo booth distillery chambray. Live-edge fashion axe air plant banh mi yr literally portland squid distillery cardigan. Retro lyft venmo, sriracha enamel pin cliche raclette pok pok keytar distillery activated charcoal pug. 90's man braid vape farm-to-table.</p>
          </div>
        </v-card-text>
      </v-navigation-drawer>
      <v-app-bar
        color="indigo lighten-1"
        dense
        dark
        elevate-on-scroll
        app
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon />

        <v-toolbar-title>Mapping the University</v-toolbar-title>

        <v-spacer />
      </v-app-bar>
      <v-main
        fluid
      >
        <div id="basemap" />
        <v-footer
          color="indigo lighten-1"
          padless
        >
          <v-row
            justify="center"
            no-gutters
          >
            <v-btn
              v-for="link in links"
              :key="link"
              color="white"
              text
              rounded
              class="my-2"
            >
              {{ link }}
            </v-btn>
            <v-col
              class="indigo lighten-1 py-4 text-center white--text"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
          </v-row>
        </v-footer>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  data () {
    return {
      accessToken: 'pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg',
      map: {}
    }
  },
  mounted () {
    this.createMap()
  },
  methods: {
    createMap () {
      mapboxgl.accessToken = this.accessToken
      this.map = new mapboxgl.Map({
        container: 'basemap',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.302744, 38.829395],
        zoom: 15
      })
      this.map.on('load', () => {
        // Load a layer
        this.map.addSource('gmu', {
          type: 'geojson',
          data: 'gmufootprints.geojson'
        })
        // Add the layer
        this.map.addLayer({
          id: 'footprints',
          type: 'fill',
          source: 'gmu',
          layout: {},
          paint: {
            'fill-color': 'brown',
            'fill-opacity': 0.8
          }
        })
        // disable map zoom when using scroll
        this.map.scrollZoom.disable()
      })
    }
  }
}
</script>

<style scoped>
#basemap {
    height: 100vh;
    width: 100%;
}

.narrative {
    padding: 1rem;
}

.narrative a, .narrative a:visited {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    background: 0 0;
    transition: all .2s ease;
    text-decoration-thickness: .1em;
    text-decoration-width: .1em;
}

.narrative a:hover, .narrative a:focus {
    text-decoration-thickness: .15em;
    text-decoration-width: .15em;
}

.narrative p {
    line-height: 1.45;
    font-size: 1.1rem;
}

footer p {
    font-size: .8rem;
}

footer .logos {
    display: flex;
    flex-wrap: wrap;
}

footer .logos img {
    width: 200px;
    height: auto;
    margin: 1rem 2rem 0 0;
    box-shadow: none;
    border: 0;
}

footer .logos img.gmu-logo {
    width: 80px;
    margin-top: 0;
}

.dropcap {
    float: left;
    padding: 0px;
    font-size: 40px;
    line-height: 0px;
    margin-top: 18px;
    height: 20px;
}
</style>
