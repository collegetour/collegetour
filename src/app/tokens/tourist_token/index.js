import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
import React from 'react'

class TouristToken extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    tourist: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { presence } = this.context
    const { tourist } = this.props
    return (
      <div className="tourist-token">
        <div className="tourist-token-photo">
          <Avatar user={ tourist.user } />
        </div>
        <div className="tourist-token-details">
          <strong>{ tourist.user.full_name }</strong>
          { tourist.user.id === presence.user.id &&
            <span> ( You )</span>
          }
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
