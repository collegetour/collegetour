import ModalPanel from '../modal_panel'
import Message from '../message'
import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    buttons: PropTypes.array,
    cacheKey: PropTypes.string,
    children: PropTypes.any,
    component: PropTypes.any,
    color: PropTypes.string,
    data: PropTypes.object,
    message: PropTypes.object,
    panel: PropTypes.object,
    page: PropTypes.object,
    tabs: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    color: 'red'
  }

  state = {
    access: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleUpdateTitle = this._handleUpdateTitle.bind(this)

  render() {
    const { message } = this.props
    const Component = this.props.component
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="maha-page-body">
          { Component && <Component { ...this._getComponent() } /> }
          { message && <Message { ...message } /> }
          { this.props.children }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { title } = this.props
    this._handleUpdateTitle(title)
  }

  componentDidUpdate(prevProps) {
    const { active, title } = this.props
    if(active !== prevProps.active && active) {
      this._handleUpdateTitle(title)
    }
  }

  componentWillUnmount() {
    this._handleUpdateTitle(null)
  }

  _handleUpdateTitle(title) {
    // this.context.host.setTitle(title)
  }

  _getComponent() {
    const { data, page } = this.props
    return {
      ...this.props,
      page,
      ...data
    }
  }

  _getModalPanel() {
    const { color, title } = this.props
    const panel = {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      color,
      title
    }
    return panel
  }

  _handleBack() {
    this.context.router.history.goBack()
  }

}

export default Page
