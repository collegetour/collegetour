import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Searchbox extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.string,
    prompt: PropTypes.string,
    q: PropTypes.string,
    onAbort: PropTypes.func,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onIcon: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
    prompt: 'Search...',
    q: '',
    onChange: (value) => {}
  }

  _handleChange = _.throttle(this._handleChange, 500)


  render() {
    const { icon, q } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="searchbox-container">
          { icon &&
            <div className="searchbox-extra" onClick={ this._handleIcon.bind(this) }>
              <i className={ `fa fa-fw fa-${icon}` } />
            </div>
          }
          <div className="searchbox-input">
            <div className="searchbox-icon">
              <i className="fa fa-search" />
            </div>
            <div className="searchbox-field">
              <input { ...this._getInput() } />
            </div>
            { q.length > 0 &&
              <div className="searchbox-remove-icon" onClick={ this._handleAbort.bind(this) }>
                <i className="fa fa-times-circle" />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  _getClass() {
    const classes = ['searchbox']
    if(this.props.active) classes.push('active')
    return classes.join(' ')
  }

  _getInput() {
    const { prompt, q } = this.props
    return {
      type: 'text',
      placeholder: prompt,
      value: q,
      onFocus: this._handleBegin.bind(this),
      onBlur: this._handleEnd.bind(this),
      onChange: this._handleType.bind(this)
    }
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) this._handleChange(q)
  }

  _handleIcon() {
    this.props.onIcon()
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleChange(q) {
    this.props.onChange(q)
  }

  _handleEnd() {
    this.props.onEnd()
  }

  _handleType(e) {
    const { onType } = this.props
    onType(e.target.value)
  }

  _handleAbort() {
    this.props.onAbort()
  }

}

export default Searchbox