import Textfield from './textfield'
import PropTypes from 'prop-types'
import Textarea from './textarea'
import React from 'react'

class Field extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.string,
    error: PropTypes.string,
    field: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { error, field } = this.props
    return (
      <div className="field">
        { field.label && <label>{ field.label }</label> }
        { field.type === 'textarea' && <Textfield { ...this._getTextarea(field) } /> }
        { field.type === 'textfield' && <Textarea { ...this._getTextfield(field) } /> }
        { error && <div className="error-message">{ error }</div> }
      </div>
    )
  }

  _getTextarea({ name, defaultValue, error, placeholder }) {
    return {
      defaultValue,
      error,
      placeholder,
      onChange: this._handleChange.bind(this, name)
    }
  }

  _getTextfield({ name, defaultValue, error, placeholder, rows }) {
    return {
      defaultValue,
      error,
      placeholder,
      rows,
      onChange: this._handleChange.bind(this, name)
    }
  }

  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

}

export default Field
