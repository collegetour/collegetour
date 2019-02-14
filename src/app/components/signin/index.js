import PropTypes from 'prop-types'
import React from 'react'

class Signin extends React.Component {

  static propTypes = {
    tourist_id: PropTypes.number
  }

  static defaultProps = {}

  render() {
    return (
      <div className="signin-canvas">
        <div className="signin">
          <div className="signin-header">
            <i className="fa fa-university" />
            <h1>College Tourist</h1>
          </div>
          <a href={ this._getSignin('google') } className="signin-button">
            <i className="fa fa-google" />
            Log In with Google
          </a>
          <a href={ this._getSignin('facebook') } className="signin-button">
            <i className="fa fa-facebook" />
            Log In with Facebook
          </a>
          <a href={ this._getSignin('instagram') } className="signin-button">
            <i className="fa fa-instagram" />
            Log In with Instagram
          </a>
        </div>
      </div>
    )
  }

  _getSignin(network) {
    const { tourist_id } = this.props
    const { pathname } = window.location
    const redirect = pathname !== '/' ? pathname : null
    const path = `/signin/${network}`
    const query = []
    if(redirect) query.push(`redirect=${redirect}`)
    if(tourist_id) query.push(`tourist_id=${tourist_id}`)
    return query.length > 0 ? `${path}?${query.join('&')}` : path
  }

}

export default Signin
