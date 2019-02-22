import PropTypes from 'prop-types'
import React from 'react'

class Signin extends React.Component {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    url: PropTypes.string,
    tourist_id: PropTypes.string,
    onFetch: PropTypes.func
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
          <div onClick={ this._handleFetch.bind(this, 'google') }className="signin-button">
            <i className="fa fa-google" />
            Log In with Google
          </div>
          <div onClick={ this._handleFetch.bind(this, 'facebook') } className="signin-button">
            <i className="fa fa-facebook" />
            Log In with Facebook
          </div>
          <div onClick={ this._handleFetch.bind(this, 'instagram') } className="signin-button">
            <i className="fa fa-instagram" />
            Log In with Instagram
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props
    if(url !== prevProps.url && url) {
      this.context.host.signin(url)
    }
  }

  _handleFetch(network) {
    const { host } = this.context
    const { tourist_id } = this.props
    const { pathname } = window.location
    const redirect = pathname !== '/' ? pathname : null
    const query = { host: host.type }
    if(redirect) query.redirect = redirect
    if(tourist_id) query.tourist_id = tourist_id
    this.props.onFetch(network, query)
  }

}

export default Signin
