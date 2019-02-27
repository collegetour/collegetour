import PropTypes from 'prop-types'
import Contacts from '../contacts'
import Invitation from './invitation'
import Loader from '../loader'
import Access from './access'
import React from 'react'

class Invite extends React.Component {

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    access: PropTypes.bool,
    status: PropTypes.string,
    tour_id: PropTypes.string,
    onLoadAccess: PropTypes.func,
    onSaveAccess: PropTypes.func
  }

  static defaultProps = {}

  _handleAllow = this._handleAllow.bind(this)

  render() {
    const { host } = this.context
    const { access, status } = this.props
    if(host.type === 'browser' || access === false) return <Invitation />
    if(status === 'loading') return <Loader />
    if(host.type === 'cordova' && access === true) return <Contacts { ...this._getContacts() } />
    if(host.type === 'cordova') return <Access { ...this._getAccess() } />
    return null
  }

  componentDidMount() {
    this.props.onLoadAccess()
  }

  _getAccess() {
    const { tour_id } = this.props
    return {
      tour_id,
      onAllow: this._handleAllow,
      onDeny: this._handleSaveAccess.bind(this, false)
    }
  }

  _getContacts() {
    const { tour_id } = this.props
    return {
      tour_id
    }
  }

  _handleAllow() {
    this.context.host.enableContacts(this._handleSaveAccess.bind(this))
    this.props.onSaveAccess(true)
  }

  _handleSaveAccess(enabled) {
    this.props.onSaveAccess(enabled)
  }

}

export default Invite
