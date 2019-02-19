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

  render() {
    return (
      <div className="portal">
        { this.props.children }
        <CSSTransition in={ false } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <div className="portal-overlay" />
        </CSSTransition>
        <CSSTransition in={ false } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <Account />
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
