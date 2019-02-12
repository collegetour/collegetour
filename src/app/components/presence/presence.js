import PropTypes from 'prop-types'
import Signin from '../signin'
import React from 'react'

class Presence extends React.Component {

  static childContextTypes = {
    presence: PropTypes.any
  }

  static propTypes = {
    children: PropTypes.any,
    token: PropTypes.string,
    user: PropTypes.object,
    onLoadSession: PropTypes.func,
    onLoadUser: PropTypes.func,
    onSaveUser: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { user } = this.props
    if(user === null) return <Signin />
    return this.props.children
  }

  componentDidMount() {
    this.props.onLoadUser()
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
