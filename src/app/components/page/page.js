import ModalPanel from '../modal_panel'
import Message from '../message'
import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.Component {

  static contextTypes = {
    presence: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    buttons: PropTypes.array,
    cacheKey: PropTypes.string,
    children: PropTypes.any,
    component: PropTypes.any,
    color: PropTypes.string,
    data: PropTypes.object,
    leftItems: PropTypes.array,
    message: PropTypes.object,
    panel: PropTypes.object,
    page: PropTypes.object,
    rightItems: PropTypes.array,
    tabs: PropTypes.object,
    tasks: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    color: 'red'
  }

  state = {
    access: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleUpdateTitle = this._handleUpdateTitle.bind(this)

  render() {
    const { message } = this.props
    const Component = this.props.component
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="page-body">
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
    const { color, leftItems, rightItems, tasks, title } = this.props
    const panel = {
      leftItems: leftItems || [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      color,
      title
    }
    if(rightItems) panel.rightItems = rightItems
    if(tasks && tasks.items && tasks.items.filter(task => task.show !== false).length > 0) {
      panel.rightItems = [{ icon: tasks.icon || 'ellipsis-v', handler: this._handleTasks }]
    }
    return panel
  }

  _handleBack() {
    this.context.router.history.goBack()
  }

  _handleTasks() {
    const { tasks } = this.props
    this.context.tasks.open(tasks.items)
  }
}

export default Page
