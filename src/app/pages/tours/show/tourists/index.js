import PropTypes from 'prop-types'
import Avatar from '../../../../components/avatar'
import React from 'react'

class Tourists extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    tourists: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { tourists } = this.props
    return (
      <div className="list">
        { tourists.map((tourist, index) => (
          <div className="list-item" key={`tourist_${index}`}>
            <div className="tourist-token">
              <div className="tourist-token-photo">
                <Avatar user={ tourist.user } />
              </div>
              <div className="tourist-token-details">
                <strong>{ tourist.user.full_name }</strong><br />
                { tourist.user.email }
              </div>
              <div className="tourist-token-icon">
                { tourist.claimed_at ?
                  <i className="fa fa-fw fa-check" /> :
                  <i className="fa fa-fw fa-clock-o" />
                }
              </div>
            </div>
          </div>
        )) }
      </div>
    )
  }

}

export default Tourists
