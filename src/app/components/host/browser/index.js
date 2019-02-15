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
        openWindow: this._handleOpenWindow
      }
    }
  }

  _handleOpenWindow(url) {
    this.link.href = url
    this.link.click()
  }


}

export default Browser
