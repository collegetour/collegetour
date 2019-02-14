import Impression from '../impression'
import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Feed extends React.Component {

  static propTypes = {
    impressions: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { impressions } = this.props
    return (
      <div className="feed">
        { impressions.length === 0 &&
          <Message { ...this._getMessage() } />
        }
        { impressions.length > 0 &&
          <div className="visit-photos-body">
            <div className="visit-photos-container">
              { impressions.map((impression, index) => (
                <Impression impression={ impression } key={`impression_${impression.id}`} />
              )) }
            </div>
          </div>
        }
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


}

export default Feed
