import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'

class Portal extends React.Component {

  static childContextTypes = {
    portal: PropTypes.object
  }

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  render() {
    const { presence } = this.context
    return (
      <div className="portal">
        { this.props.children }
        <CSSTransition in={ false } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <div className="portal-overlay" />
        </CSSTransition>
        <CSSTransition in={ false } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
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
              <div className="account-menuitem">
                <i className="fa fa-fw fa-power-off" /> Sign Out
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }

  getChildContext() {
    return {
      portal: {
      }
    }
  }

}

export default Portal
