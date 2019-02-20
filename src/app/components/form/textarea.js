import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextArea extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: '',
    rows: 5,
    tabIndex: 0,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    return <textarea { ...this._getTextarea() } />
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: _.toString(defaultValue)
    })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.defaultValue !== prevProps.defaultValue) {
      this.setValue(this.props.defaultValue)
    }
    if(this.state.value !== prevState.value) {
      this.props.onChange(this.state.value )
    }
  }


  _getClass() {
    const classes = ['ui','fluid','input']
    return classes.join(' ')
  }

  _getTextarea() {
    const { placeholder, rows, tabIndex } = this.props
    const { value } = this.state
    return {
      placeholder,
      rows,
      tabIndex,
      value,
      onChange: this._handleChange.bind(this)
    }
  }

  _handleChange(event) {
    this.setValue(event.target.value)
  }

  setValue(value) {
    this.setState({ value })
  }

}

export default TextArea
