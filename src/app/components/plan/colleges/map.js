import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Map extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    destination: PropTypes.string,
    origin: PropTypes.string,
    visits: PropTypes.array,
    handleClick: PropTypes.func
  }

  static defaultProps = {}

  map = null
  markers = []

  _handlePlotRoute = this._handlePlotRoute.bind(this)
  _handleLoadMap = this._handleLoadMap.bind(this)

  render() {
    return <div className="map" ref={ node => this.el = node } />
  }

  componentDidMount(){
    this.map = new window.google.maps.Map(this.el, {
      disableDefaultUI: true
    })
    this.directions = new window.google.maps.DirectionsService
    this.renderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeWeight: 2,
        strokeColor: '#888888'
      }
    })
    this.renderer.setMap(this.map)
    this._handleLoadMap()
  }

  componentDidUpdate(prevProps){
    const { visits } = this.props
    if(!_.isEqual(visits, prevProps.visits)) {
      this._handleLoadMap()
    }
  }

  _handleLoadMap() {
    const { destination, origin, visits } = this.props
    this.markers.map((marker,index) => {
      marker.setMap(null)
    })
    this.directions.route({
      origin,
      destination,
      waypoints: visits.map(visit => ({
        location: `${visit.college.name}, ${visit.college.city}, ${visit.college.state}`,
        stopover: true
      })),
      travelMode: 'DRIVING'
    }, this._handlePlotRoute)
  }

  _handlePlotRoute(response, status) {
    if(status !== 'OK') window.alert('Directions request failed due to ' + status)
    this.renderer.setDirections(response)
    const colors = ['#DB2828','#F2711C','#FBBD08','#B5CC18','#21BA45','#2185D0','#6435C9','#A333C8','#E03997']
    response.routes[0].legs.map((leg, index) => {
      new window.google.maps.Marker({
        position: {
          lat: leg.start_location.lat(),
          lng: leg.start_location.lng()
        },
        map: this.map,
        icon: {
          path: 'M0,-25 C35,-25, 35,25, 0,25 C-35,25, -35,-25, 0,-25',
          fillColor: colors[index],
          fillOpacity: 1,
          strokeWeight: 0,
          scale: .20
        }
      })
    })
  }
}

export default Map
