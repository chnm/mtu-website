require('d3');
import Visualization from "../common/visualization";

export default class MasonMap extends Visualization {
  constructor(id, data, dim) {
    const margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    };

    super(id, data, dim, margin);

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg';

    // return a render function to draw the map 
    render = () => {
        const map = new mapboxgl.Map({
            container: 'visualization',
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-77.302744, 38.829395],
            zoom: 15
        });
    
        map.on('load', () => {
            map.addLayer({
                id: 'terrain-data',
                type: 'line',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.mapbox-terrain-v2'
                },
                'source-layer': 'contour'
            });
        });
    }
  }
}
