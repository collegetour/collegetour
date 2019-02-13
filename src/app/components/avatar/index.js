import React from 'react'
import PropTypes from 'prop-types'

class Avatar extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { user } = this.props
    return (
      <div className="avatar">
        { user.photo && <img src={ user.photo } />}
        { !user.photo &&
          <div className="avatar-initials">
            { user.initials }
          </div>
        }
      </div>
    )
  }

}

export default Avatar
