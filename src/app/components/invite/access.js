import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Access extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onAllow: PropTypes.func,
    onDeny: PropTypes.func
  }

  static defaultProps = {}

  _handleAllow = this._handleAllow.bind(this)
  _handleDeny = this._handleDeny.bind(this)

  render() {
    return <Message { ...this._getMessage() } />
  }

  _getPanel() {
    return {
      title: 'Send Invitation'
    }
  }

  _getMessage() {
    return {
      color: 'green',
      icon: 'id-card-o',
      title: 'Access Contact List',
      text: 'If you grant us access, we can invite people from your phone\'s contact list. If not, you can still invite them manually.',
      buttons: [
        {
          label: 'No Thanks',
          handler: this._handleDeny
        },
        {
          label: 'Allow Access',
          handler: this._handleAllow
        }
      ]
    }
  }

  _handleAllow() {
    this.props.onAllow()
  }

  _handleDeny() {
    this.props.onDeny()
  }
}

export default Access
