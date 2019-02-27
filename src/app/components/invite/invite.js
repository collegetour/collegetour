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
    access: PropTypes.string,
    status: PropTypes.string,
    tour_id: PropTypes.string,
    onLoadAccess: PropTypes.func,
    onSetAccess: PropTypes.func
  }

  static defaultProps = {}

  _handleAsk = this._handleAsk.bind(this)

  render() {
    const { access } = this.props
    if(access === 'denied') return <Invitation { ...this._getInvitation() } />
    if(access === 'granted') return <Contacts { ...this._getContacts() } />
    if(access === 'unknown') return <Access { ...this._getAccess() } />
    return <Loader />
  }

  componentDidMount() {
    this._handleAsk()
  }

  _getAccess() {
    const { tour_id } = this.props
    return {
      tour_id,
      onAllow: this._handleAsk,
      onDeny: this._handleSetAccess.bind(this, false)
    }
  }

  _getContacts() {
    const { tour_id } = this.props
    return {
      tour_id
    }
  }

  _getInvitation() {
    const { tour_id } = this.props
    return {
      tour_id
    }
  }

  _handleAsk() {
    const { host } = this.context
    host.getContactsPermission(this._handleSetAccess.bind(this))
  }

  _handleSetAccess(enabled) {
    this.props.onSetAccess(enabled)
  }

}

export default Invite
