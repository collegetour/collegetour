import PropTypes from 'prop-types'
import React from 'react'

class Signin extends React.Component {

  static propTypes = {
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
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x" />
              <i className="fa fa-google fa-stack-1x" />
            </span>
            Log In with Google
          </a>
          <a href={ this._getSignin('facebook') } className="signin-button">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x" />
              <i className="fa fa-facebook fa-stack-1x" />
            </span>
            Log In with Facebook
          </a>
          <a href={ this._getSignin('instagram') } className="signin-button">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x" />
              <i className="fa fa-instagram fa-stack-1x" />
            </span>
            Log In with Instagram
          </a>
        </div>
      </div>
    )
  }

  _getSignin(network) {
    const tourist_id = 1
    const redirect = window.location.pathname
    const path = `/signin/${network}`
    return redirect ? `${path}?redirect=${redirect}&tourist_id=${tourist_id}` : path
  }

}

export default Signin
