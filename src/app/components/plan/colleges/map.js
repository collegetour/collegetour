import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Map extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    visits: PropTypes.array,
    handleClick: PropTypes.func
  }

  static defaultProps = {
    config: {
      center: {
        lat: 42.427368,
        lng: -76.471910
      },
      zoom: 12,
      disableDefaultUI: true
    }
  }

  map = null
  markers = []

  _handlePlotRoute = this._handlePlotRoute.bind(this)
  _handleLoadMap = this._handleLoadMap.bind(this)

  render() {
    return <div className="map" ref={ node => this.el = node } />
  }

  componentDidMount(){
    const { config } = this.props
    this.map = new window.google.maps.Map(this.el, config)
    this.directions = new window.google.maps.DirectionsService
    this.renderer = new window.google.maps.DirectionsRenderer
    this.renderer.setMap(this.map)
    this._handleLoadMap()
  }

  _handleLoadMap() {
    const { visits } = this.props
    this.markers.map((marker,index) => {
      marker.setMap(null)
    })
    this.directions.route({
      origin: '322 S Geneva St, Ithaca, NY',
      destination: '322 S Geneva St, Ithaca, NY',
      waypoints: visits.map(visit => ({
        location: `${visit.college.name}, ${visit.college.city}, ${visit.college.state}`,
        stopover: true
      })),
      travelMode: 'DRIVING'
    }, this._handlePlotRoute)
  }

  _handlePlotRoute(response, status) {
    if(status !== 'OK') window.alert('Directions request failed due to ' + status)
    this.renderer .setDirections(response)
  }
}

export default Map
