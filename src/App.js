import React, { Component } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const mapboxToken = 'pk.eyJ1IjoiaGVwcGxlcmoiLCJhIjoiMjNqTEVBNCJ9.pGqKqkUDlcFmKMPeoARwkg'

class Map extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 38.8404,
        longitude: -77.3152,
        zoom: 13
    },
    currMarker: null,
    markers: []
  }
  this.handleViewportChange = this.handleViewportChange.bind(this)
  this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(this)
  this.handleResult = this.handleResult.bind(this);
  this.addMarker = this.addMarker.bind(this);
}
mapRef = React.createRef()

handleViewportChange(viewport) {
  this.setState(prevState => ({
    viewport: {...prevState.viewport, ...viewport}
  }))
}
handleGeocoderViewportChange(viewport) {
  const geocoderDefaultOverrides = { transitionDuration: 1000 }

  return this.handleViewportChange({
    ...viewport,
    ...geocoderDefaultOverrides
  })
}
handleResult (result) {
  this.setState({
    currMarker: {
      name: result.result.place_name,
      latitude: result.result.center[1],
      longitude: result.result.center[0]
    }
  })
}
addMarker() {
  const {currMarker} = this.state
  this.setState(prevState => ({
    markers: [...prevState.markers, currMarker],
    currMarker: null
  }))
}

render() {
  const {viewport, markers} = this.state

  return (
    <ReactMapGl
    ref={this.mapRef}
    {...viewport}
    onViewportChange={viewport => this.setState({viewport})}
    mapboxApiAccessToken={mapboxToken}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    >

      <button className="add-btn" onClick={this.addMarker}>Add Marker</button>
      {markers.map((marker, idx) => {
        return (
          <Marker
            key={idx}
            latitude={marker.latitude}
            longitude={marker.longitude}
          >
            <img src="pin.png" alt="pin" />
            </Marker>
        )
      })
      }

      <Geocoder
      onSelected={this.handleResult}
      mapRef = {this.mapRef}
      mapboxApiAccessToken={mapboxToken}
      onResult={this.handleResult}
      onViewportChange={this.handleGeocoderViewportChange}
      countries="us"
      position="top-right"
      placeholder="Search for a location"
      />
    </ReactMapGl>
  )
}
}

export default Map;