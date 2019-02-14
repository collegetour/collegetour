import Message from '../../../components/message'
import { Page } from '../../../components/page'
import { Impression } from '../impression'
import PropTypes from 'prop-types'
import React from 'react'

class Visit extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array,
    visit: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { impressions, visit } = this.props
    return (
      <div className="visit">
        <div className="visit-photos">
          <div className="visit-photos-header">
            <div className="visits-visit">
              <div className="visits-visit-logo">
                <img src={ visit.college.logo } />
              </div>
              <div className="visits-visit-details">
                <strong>{ visit.college.name }</strong><br />
                <span className="visits-visit-details-location">
                  { visit.college.city }, { visit.college.state }<br />
                </span>
              </div>
            </div>
          </div>
          <div className="visit-photos-displays">
            <div className="visit-photos-display active">
              <i className="fa fa-camera-retro" />
            </div>
            <div className="visit-photos-display">
              <i className="fa fa-check-circle" />
            </div>
          </div>
          { impressions.length === 0 &&
            <Message { ...this._getMessage() } />
          }
          { impressions.length > 0 &&
            <div className="visit-photos-body">
              { impressions.map((impression, index) => (
                <Impression impression={ impression } key={`impression_${impression.id}`} />
              )) }
            </div>
          }
        </div>
      </div>
    )
  }

  _getMessage() {
    return {
      icon: 'camera-retro',
      title: 'No impressions',
      text: 'No one on this tour has shared any impressions of this college yet'
    }
  }

  _handleClick(id) {
    this.context.router.history.push(`/tours/${id}/visits/${id}/impressions/${id}`)
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
