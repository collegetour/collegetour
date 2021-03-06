import Impression from '../../components/impression'
import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Show extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    router: PropTypes.object,
    tracker: PropTypes.object
  }

  static propTypes = {
    impression: PropTypes.object,
    page: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return (
      <div className="impression-show">
        <div className="container">
          <Impression { ...this._getImpression() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleTrack()
  }

  _getImpression() {
    const { page, impression } = this.props
    const { tour_id, visit_id } = page.params
    return {
      impression,
      tour_id,
      visit_id
    }
  }

  _handleTrack() {
    const { page, impression } = this.props
    const { tour_id, visit_id } = page.params
    this.context.tracker.track('viewed impression', { tour_id, visit_id, impression_id: impression.id })
  }

}

const mapResourcesToPage = (props, context, page) => ({
  impression: `/api/tours/${page.params.tour_id}/visits/${page.params.visit_id}/impressions/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Impression',
  component: Show
})

export default Page(mapResourcesToPage, mapPropsToPage)
