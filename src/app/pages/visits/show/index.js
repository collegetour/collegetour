import Camera from '../../../components/camera'
import { Page } from '../../../components/page'
import Feed from '../../../components/feed'
import PropTypes from 'prop-types'
import React from 'react'

class Visit extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array,
    page: PropTypes.object,
    visit: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { visit } = this.props
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
          <div className="visit-photos-tools">
            <div className="visit-photos-container">
              <div className="visit-photos-displays">
                <div className="visit-photos-display active">
                  <i className="fa fa-picture-o" />
                </div>
                <div className="visit-photos-display">
                  <i className="fa fa-check-circle" />
                </div>
              </div>
            </div>
          </div>
          <Feed { ...this._getFeed() } />
        </div>
        <div className="visit-camera">
          <Camera { ...this._getCamera() } />
        </div>
      </div>
    )
  }

  _getCamera() {
    const { page } = this.props
    return {
      tour_id: page.params.tour_id,
      visit_id: page.params.id
    }
  }

  _getFeed() {
    const { impressions } = this.props
    return {
      impressions
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
