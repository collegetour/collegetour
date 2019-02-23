import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
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
          <br />{ tourist.user.email }
        </div>
        <div className="tourist-token-icon">
          { tourist.claimed_at ?
            <i className="fa fa-fw fa-check" /> :
            <i className="fa fa-fw fa-clock-o" />
          }
        </div>
      </div>
    )
  }

}

export default TouristToken
