import PropTypes from 'prop-types'
import Avatar from '../avatar'
import moment from 'moment'
import React from 'react'

class Impression extends React.Component {

  static propTypes = {
    impression: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { impression } = this.props
    return (
      <div className="impression">
        <div className="impression-header">
          <div className="impression-header-avatar">
            <Avatar user={ impression.user } />
          </div>
          <div className="impression-header-details">
            <strong>{ impression.user.full_name }</strong><br />
            { moment(impression.created_at).format('MMM DD, YYYY @ hh:mm A') }
          </div>
          <div className="impression-header-icon">
            <i className="fa fa-ellipsis-h" />
          </div>
        </div>
        <div className="impression-asset">
          <img src={ impression.asset } />
        </div>
        <div className="impression-caption">
          { impression.caption }
        </div>
      </div>
    )
  }

}

export default Impression
