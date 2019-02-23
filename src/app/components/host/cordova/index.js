import React from 'react'
import PropTypes from 'prop-types'

class Cordova extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    permission: PropTypes.string,
    user: PropTypes.object
  }

  state = {
    hasFocus: true
  }

  _handleBlurFocus = this._handleBlurFocus.bind(this)
  _handleGetVersion = this._handleGetVersion.bind(this)
  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handlePushRoute = this._handlePushRoute.bind(this)
  _handleReceiveMessage = this._handleReceiveMessage.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleUpdateUnseen = this._handleUpdateUnseen.bind(this)

  render() {
    return (
      <div className="cordova">
        { this.props.children }
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('message', this._handleReceiveMessage, false)
    this._handleGetVersion()
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleReceiveMessage, false)
  }

  getChildContext() {
    return {
      host: {
        type: 'cordova',
        mobile: true,
        signin: this._handleSignin,
        hasFocus: this._handleHasFocus,
        openWindow: this._handleOpenWindow,
        updateUnseen: this._handleUpdateUnseen
      }
    }
  }

  _handleBlurFocus(hasFocus) {
    this.setState({ hasFocus })
  }

  _handleGetVersion() {
    this._handleSendMessage('getVersion')
  }

  _handleHasFocus() {
    return this.state.hasFocus
  }

  _handleOpenWindow(url) {
    this._handleSendMessage('openWindow', url)
  }

  _handlePushRoute(route) {
    this.context.router.push(route)
  }

  _handleReceiveMessage(e) {
    if(e.origin !== 'file://') return
    const message = e.data
    if(message.action === 'pushPath') {
      window.location.href = message.data.path
    }
    if(message.action === 'pushRoute') {
      this._handlePushRoute(message.data.route)
    }
    if(message.action === 'pause') {
      this._handleBlurFocus(false)
    }
    if(message.action === 'resume') {
      this._handleBlurFocus(true)
    }
  }

  _handleSignin(auth_url) {
    this._handleSendMessage('signin', auth_url)
  }

  _handleSendMessage(action, data = null) {
    window.parent.postMessage({
      action,
      data
    }, '*')
  }

  _handleUpdateUnseen(count) {
    this._handleSendMessage('updateBadge', { count })
  }


}

export default Cordova
