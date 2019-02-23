import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Account from '../account'
import React from 'react'

class Portal extends React.Component {

  static childContextTypes = {
    portal: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  state = {
    account: false
  }

  _handleToggleAccount = this._handleToggleAccount.bind(this)

  render() {
    const { account } = this.state
    return (
      <div className="portal">
        { this.props.children }
        <CSSTransition in={ account } classNames="opacity" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <div className="portal-overlay" onClick={ this._handleToggleAccount } />
        </CSSTransition>
        <CSSTransition in={ account } classNames="translatex" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <div className="portal-drawer">
            <Account />
          </div>
        </CSSTransition>
      </div>
    )
  }

  getChildContext() {
    return {
      portal: {
        toggleAccount: this._handleToggleAccount
      }
    }
  }

  _handleToggleAccount() {
    const { account } = this.state
    this.setState({
      account: !account
    })
  }

}

export default Portal
