import Impression from '../impression'
import PropTypes from 'prop-types'
import React from 'react'

class Feed extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    tracker: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array,
    tour_id: PropTypes.string,
    visit_id: PropTypes.string
  }

  static defaultProps = {}

  _handleTrack = this._handleTrack.bind(this)

  render() {
    const { impressions } = this.props
    return (
      <div className="feed">
        { impressions.map((impression, index) => (
          <div className="feed-impression" key={`impression_${impression.id}`} onClick={ this._handleClick.bind(this, impression.id) }>
            <Impression { ...this._getImpression(impression) } />
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    this._handleTrack()
  }

  _getImpression(impression) {
    const { tour_id, visit_id } = this.props
    return {
      impression,
      tour_id,
      visit_id
    }
  }

  _getMessage() {
    return {
      icon: 'institution',
      title: 'No impressions',
      text: 'No one has shared any impressions of this college yet'
    }
  }

  _handleClick(id) {
    const { history } = this.context.router
    const { tour_id, visit_id } = this.props
    history.push(`/tours/${tour_id}/visits/${visit_id}/impressions/${id}`)
  }

  _handleTrack() {
    const { tour_id, visit_id } = this.props
    this.context.tracker.track('viewed feed', { tour_id, visit_id })
  }

}

export default Feed
