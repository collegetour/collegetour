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
          <a href="/signin/google" className="signin-button">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x" />
              <i className="fa fa-google fa-stack-1x" />
            </span>
            Log In with Google
          </a>
          <a href="/signin/facebook" className="signin-button">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x" />
              <i className="fa fa-facebook fa-stack-1x" />
            </span>
            Log In with Facebook
          </a>
          <a href="/signin/instagram" className="signin-button">
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

}

export default Signin
