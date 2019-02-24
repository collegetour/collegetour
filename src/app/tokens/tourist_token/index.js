import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class TouristToken extends React.Component {

  static contextTypes = {}

  static propTypes = {
    tourist: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { tourist } = this.props
    return (
      <div className="tourist-token">
        <div className="tourist-token-photo">
          <Avatar user={ tourist.user } size="48" />
        </div>
        <div className="tourist-token-details">
          <strong>{ tourist.user.full_name }</strong>
          { !tourist.claimed_at &&
            <div className="tourist-token-awaiting">Awaiting acceptance</div>
          }
          { tourist.user.id === tourist.tour.owner_id &&
            <div className="tourist-token-status">Owner</div>
          }
          { tourist.user.id !== tourist.tour.owner_id && tourist.claimed_at &&
            <div className="tourist-token-status">
              Joined tour { moment(tourist.claimed_at).format('ddd, MMM DD, YYYY')}
            </div>
          }
        </div>
      </div>
    )
  }

}

export default TouristToken
