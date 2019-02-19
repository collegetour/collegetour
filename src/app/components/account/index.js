import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'

class Account extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { presence } = this.context
    return (
      <div className="account">
        <div className="account-header">
          <div className="account-identity">
            <Avatar user={ presence.user } />
            <h1>{ presence.user.full_name }</h1>
            <p>{ presence.user.email }</p>
          </div>
        </div>
        <div className="account-menu">
          <div className="account-menuitem">
            <i className="fa fa-fw fa-id-card" /> Edit Account
          </div>
          <div className="account-menuitem" onClick={ this._handleSignout } >
            <i className="fa fa-fw fa-power-off" /> Sign Out
          </div>
        </div>
      </div>
    )
  }

  _handleSignout() {
    this.context.presence.signout()
  }

}

export default Account
