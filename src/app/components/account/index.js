import PropTypes from 'prop-types'
import Avatar from '../avatar'
import Edit from './edit'
import React from 'react'

class Account extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    portal: PropTypes.object,
    presence: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleEdit = this._handleEdit.bind(this)
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
          <div className="account-menuitem" onClick={ this._handleEdit }>
            <i className="fa fa-fw fa-id-card" /> Edit Account
          </div>
          <div className="account-menuitem" onClick={ this._handleSignout } >
            <i className="fa fa-fw fa-power-off" /> Sign Out
          </div>
        </div>
      </div>
    )
  }

  _handleEdit() {
    this.context.modal.open(Edit)
    this.context.portal.toggleAccount()
  }

  _handleSignout() {
    this.context.presence.signout()
  }

}

export default Account
