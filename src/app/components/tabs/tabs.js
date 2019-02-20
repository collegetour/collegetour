import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Tabs extends React.Component {

  static contextTypes = {
    stack: PropTypes.object
  }

  static propTypes = {
    chosen: PropTypes.number,
    items: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    chosen: null,
    items: [],
    onChoose: (index) => {}
  }

  _swipe: Object = {}

  state = {
    visited: [],
    transitioning: false
  }

  render() {
    const { items } = this.props
    return (
      <div className="tabs">
        <div className="tabs-header">
          <div className="tabs-header-menu">
            <div className="ui three item menu">
              { items.map((item, index) => (
                <div key={`tab_${index}`} className={ this._getItemClass(index) } onClick={ this._handleChoose.bind(this, index) }>
                  { item.label }
                </div>
              )) }
            </div>
          </div>
        </div>
        <div className="tabs-body">
          { items.map((item, index) => (
            <div key={`tab_body_${index}`} className={ this._getTabClass(index) }>
              <div className="tab-content">
                { _.isFunction(item.component) ? React.createElement(item.component) : item.component }
              </div>
            </div>
          )) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onChoose(0)
  }

  _getItemClass(index) {
    const { chosen } = this.props
    const classes = ['item']
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getTabClass(index) {
    const { transitioning } = this.state
    const { chosen } = this.props
    const classes = ['tab']
    if(transitioning) classes.push('transitioning')
    if(index > chosen) classes.push('right')
    if(index < chosen) classes.push('left')
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _handleChoose(index: number): void {
    const { onChoose } = this.props
    const visited = _.uniq([ ...this.state.visited, index ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => onChoose(index), 20)
    setTimeout(() => this.setState({ transitioning: false }), 500)
  }

}

export default Tabs
