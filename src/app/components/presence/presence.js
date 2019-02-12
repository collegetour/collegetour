import PropTypes from 'prop-types'
import Signin from '../signin'
import React from 'react'
import _ from 'lodash'

class Presence extends React.Component {

  static childContextTypes = {
    presence: PropTypes.any
  }

  static propTypes = {
    children: PropTypes.any,
    status: PropTypes.string,
    token: PropTypes.string,
    user: PropTypes.object,
    onLoadSession: PropTypes.func,
    onLoadUser: PropTypes.func,
    onSaveUser: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { status, user } = this.props
    if(status === 'loaded' && user === null) return <Signin />
    if(status !== 'saved') return null
    return this.props.children
  }

  componentDidMount() {
    this.props.onLoadUser()
  }

  componentDidUpdate(prevProps) {
    const { user, onLoadSession, onSaveUser } = this.props
    if(!_.isEqual(user, prevProps.user)) {
      if(prevProps.user === null) {
        onLoadSession(user.token)
      } else if(user.token !== prevProps.user.token) {
        onSaveUser(user)
      }
    }
  }

  getChildContext() {
    const { token, user } = this.props
    return {
      presence: {
        token,
        user
      }
    }
  }

}

export default Presence
