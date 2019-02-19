import PropTypes from 'prop-types'
import Signin from '../signin'
import React from 'react'
import _ from 'lodash'
import Setup from '../setup'

class Presence extends React.Component {

  static childContextTypes = {
    presence: PropTypes.any
  }

  static propTypes = {
    children: PropTypes.any,
    status: PropTypes.string,
    token: PropTypes.string,
    tourist_id: PropTypes.number,
    user: PropTypes.object,
    onLoadSession: PropTypes.func,
    onLoadTourist: PropTypes.func,
    onLoadUser: PropTypes.func,
    onRemoveTourist: PropTypes.func,
    onRemoveUser: PropTypes.func,
    onSaveUser: PropTypes.func,
    onSignout: PropTypes.func
  }

  static defaultProps = {}

  _handleReload = this._handleReload.bind(this)
  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { status, tourist_id, user } = this.props
    if(status === 'loaded' && user === null) return <Signin tourist_id={ tourist_id } />
    if(status !== 'saved') return null
    if(!user.agreed_to_terms) return <Setup />
    return this.props.children
  }

  componentDidMount() {
    this.props.onLoadTourist()
    this.props.onLoadUser()
  }

  componentDidUpdate(prevProps) {
    const { status, user, onLoadSession, onRemoveTourist, onRemoveUser, onSaveUser } = this.props
    if(!_.isEqual(user, prevProps.user)) {
      if(user === null) {
        onRemoveUser()
      } else if(prevProps.user === null) {
        onLoadSession(user.token)
      } else if(user.token !== prevProps.user.token) {
        onSaveUser(user)
      }
    }
    if(status !== prevProps.status) {
      if(status === 'saved') {
        onRemoveTourist()
      }
    }
  }

  getChildContext() {
    const { token, user } = this.props
    return {
      presence: {
        token,
        user,
        reload: this._handleReload,
        signout: this._handleSignout
      }
    }
  }

  _handleReload() {
    const { user, onLoadSession } = this.props
    onLoadSession(user.token)
  }

  _handleSignout() {
    this.props.onSignout()
  }

}

export default Presence
