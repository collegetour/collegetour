import Impression from '../impression'
import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Feed extends React.Component {

  static propTypes = {
    impressions: PropTypes.array,
    tour_id: PropTypes.number,
    visit_id: PropTypes.number
  }

  static defaultProps = {}

  render() {
    const { impressions } = this.props
    if(impressions.length === 0) return <Message { ...this._getMessage() } />
    return (
      <div className="feed">
        <div className="visit-photos-body">
          <div className="visit-photos-container">
            { impressions.map((impression, index) => (
              <Impression { ...this._getImpression(impression) } key={`impression_${impression.id}`} />
            )) }
          </div>
        </div>
      </div>
    )
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
      icon: 'camera-retro',
      title: 'No impressions',
      text: 'No one on this tour has shared any impressions of this college yet'
    }
  }

}

export default Feed
