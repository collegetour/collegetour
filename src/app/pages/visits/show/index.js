import Message from '../../../components/message'
import Gallery from '../../../components/gallery'
import { Page } from '../../../components/page'
import Image from '../../../components/image'
import Photo from '../../../components/photo'
import Feed from '../../../components/feed'
import Note from '../../../components/note'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Visit extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    router: PropTypes.object,
    tracker: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array,
    page: PropTypes.object,
    visit: PropTypes.object
  }

  static defaultProps = {}

  state = {
    layout: 'gallery'
  }

  _handleCall = this._handleCall.bind(this)
  _handleDirections = this._handleDirections.bind(this)
  _handleWebsite = this._handleWebsite.bind(this)

  render() {
    const { layout } = this.state
    const { impressions, visit } = this.props
    return (
      <div className="visit">
        <div className="visit-photos">
          <div className="visit-photos-header">
            <div className="container">
              <div className="visit-photos-details">
                <div className="visit-photos-details-schedule">
                  { visit.college.city}, { visit.college.state }<br />
                  { moment(visit.date, 'YYYY-MM-DD').format('ddd, MMM DD, YYYY') }<br />
                  <label>Campus Tour: </label>{ moment(visit.campus_tour, 'hh:mm:ss').format('h:mm A') }<br />
                  <label>Info Session: </label>{ moment(visit.info_session, 'hh:mm:ss').format('h:mm A') }<br />
                  <span className="weather">
                    <i className={ `wi wi-${visit.weather}` } /> { visit.temp }&deg; F
                  </span>
                </div>
                <div className="visit-photos-details-logo">
                  <Image src={ visit.college.logo } transforms={{ w: 100, h: 100 }} />
                </div>
              </div>
              <div className="visit-photos-buttons">
                <div className="visit-photos-button" onClick={ this._handleDirections }>
                  <div className="ui basic red fluid button">Directions</div>
                </div>
                <div className="visit-photos-button" onClick={ this._handleWebsite }>
                  <div className="ui basic red fluid button">Website</div>
                </div>
                <div className="visit-photos-button" onClick={ this._handleCall }>
                  <div className="ui basic red fluid button">Call</div>
                </div>
              </div>
            </div>
          </div>
          <div className="visit-photos-tools">
            <div className="container">
              <div className="visit-photos-displays">
                <div className={ this._getDisplayClass('gallery') } onClick={ this._handleLayout.bind(this, 'gallery') }>
                  <i className="fa fa-th" />
                </div>
                <div className={ this._getDisplayClass('feed') } onClick={ this._handleLayout.bind(this, 'feed') }>
                  <i className="fa fa-th-list" />
                </div>
              </div>
            </div>
          </div>
          <div className="visit-photos-body">
            { impressions.length === 0 &&
              <div className="visit-photos-empty">
                <Message { ...this._getEmpty() } />
              </div>
            }
            { impressions.length > 0 &&
              <div className="container">
                { layout === 'feed' && <Feed { ...this._getImpressions() } /> }
                { layout === 'gallery' && <Gallery { ...this._getImpressions() } /> }
              </div>
            }
          </div>
        </div>
        <div className="visit-footer">
          <div className="visit-tools">
            <div className="visit-tool">
              <Note { ...this._getNote() } />
            </div>
            <div className="visit-tool">
              <Photo { ...this._getPhoto() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getDisplayClass(layout) {
    const classes = ['visit-photos-display']
    if(layout === this.state.layout) classes.push('active')
    return classes.join(' ')
  }

  _getEmpty() {
    return {
      icon: 'institution',
      title: 'No impressions',
      text: 'No one has shared any impressions of this college yet'
    }
  }

  _getPhoto() {
    const { page } = this.props
    return {
      tour_id: page.params.tour_id,
      visit_id: page.params.id
    }
  }

  _getImpressions() {
    const { impressions, page } = this.props
    return {
      impressions,
      tour_id: page.params.tour_id,
      visit_id: page.params.id
    }
  }

  _getNote() {
    const { page } = this.props
    return {
      tour_id: page.params.tour_id,
      visit_id: page.params.id
    }
  }

  _getReview() {
    return {

    }
  }

  _handleLayout(layout) {
    this.setState({ layout })
  }

  _handleCall() {
    const { tour_id, id } = this.props.page.params
    this.context.tracker.track('clicked call', { tour_id, visit_id: id })
    const { phone } = this.props.visit.college
    window.location.href = `tel://+1${phone.replace(/[^\d]/g, '')}`
  }

  _handleDirections() {
    const { tour_id, id } = this.props.page.params
    this.context.tracker.track('clicked directions', { tour_id, visit_id: id })
    const { name, city, state } =  this.props.visit.college
    const daddr = `${name} ${city}, ${state}`.replace(' ', '+')
    const path = `://maps.google.com/maps?daddr=${daddr}`
    if(_.includes(['iPhone','iPad','iPod'], navigator.platform)) {
      window.location.href = `maps${path}`
    } else {
      this.context.host.openWindow(`https${path}`)
    }
  }

  _handleWebsite() {
    const { tour_id, id } = this.props.page.params
    this.context.tracker.track('clicked website', { tour_id, visit_id: id })
    const { website } =  this.props.visit.college
    this.context.host.openWindow(website)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  visit: `/api/tours/${page.params.tour_id}/visits/${page.params.id}`,
  impressions: `/api/tours/${page.params.tour_id}/visits/${page.params.id}/impressions`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.visit.college.name,
  component: Visit
})

export default Page(mapResourcesToPage, mapPropsToPage)
