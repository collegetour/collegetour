import React from 'react'
import PropTypes from 'prop-types'

class Browser extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handleSignin = this._handleSignin.bind(this)

  render() {
    return (
      <div className="browser">
        { this.props.children }
        <a ref={ node => this.link = node } target="_blank" />
      </div>
    )
  }

  getChildContext() {
    return {
      host: {
        type: 'browser',
        signin: this._handleSignin,
        openWindow: this._handleOpenWindow
      }
    }
  }

  _handleOpenWindow(url) {
    this.link.href = url
    this.link.click()
  }

  _handleSignin(auth_url) {
    window.location.href = auth_url
  }


}

export default Browser
