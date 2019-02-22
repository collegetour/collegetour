import VisitToken from '../../../tokens/visit_token'
import Review from '../../../components/review'
import { Page } from '../../../components/page'
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
    router: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array,
    page: PropTypes.object,
    visit: PropTypes.object
  }

  static defaultProps = {
  }

  _handleCall = this._handleCall.bind(this)
  _handleDirections = this._handleDirections.bind(this)
  _handleWebsite = this._handleWebsite.bind(this)

  render() {
    const { visit } = this.props
    return (
      <div className="visit">
        <div className="visit-photos">
          <div className="visit-photos-header">
            <div className="visit-photos-container">
              <VisitToken visit={ visit } />
              <div className="visit-photos-schedule">
                <div className="visit-photos-event">
                  { moment(visit.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY') }<br />
                  <strong>Campus Tour: </strong>
                  { moment(visit.campus_tour, 'hh:mm:ss').format('hh:mm A') }<br />
                  <strong>Info Session: </strong>
                  { moment(visit.info_session, 'hh:mm:ss').format('hh:mm A') }
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
          <Feed { ...this._getFeed() } />
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

  _getPhoto() {
    const { page } = this.props
    return {
      tour_id: page.params.tour_id,
      visit_id: page.params.id
    }
  }

  _getFeed() {
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

  _handleCall() {
    const { phone } = this.props.visit.college
    window.location.href = `tel://${phone}`
  }

  _handleDirections() {
    const { name, city, state } =  this.props.visit.college
    const daddr = `${name} ${city}, ${state}`.replace(' ', '+')
    const protocol = _.includes(['iPhone','iPad','iPod'], navigator.platform) ? 'maps' : 'https'
    this.context.host.openWindow(`${protocol}://maps.google.com/maps?daddr=${daddr}`)
  }

  _handleWebsite() {
    const { website } =  this.props.visit.college
    this.context.host.openWindow(website)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  visit: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/visits/${page.params.id}`,
  impressions: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/visits/${page.params.id}/impressions`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Visit',
  component: Visit
})

export default Page(mapResourcesToPage, mapPropsToPage)
