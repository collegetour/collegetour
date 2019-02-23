import Addressfield from '../addressfield'
import Datefield from '../datefield'
import Textfield from './textfield'
import PropTypes from 'prop-types'
import Textarea from './textarea'
import React from 'react'

class Field extends React.Component {

  static contextTypes = {}

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { errors, field } = this.props
    return (
      <div className="field">
        { field.label && <div className="field-label">{ field.label }</div> }
        { field.instructions && <div className="field-instructions">{ field.instructions }</div> }
        { field.type === 'textarea' && <Textarea { ...this._getTextarea(field) } /> }
        { field.type === 'textfield' && <Textfield { ...this._getTextfield(field) } /> }
        { field.type === 'datefield' && <Datefield { ...this._getDatefield(field) } /> }
        { field.type === 'addressfield' && <Addressfield { ...this._getAddressfield(field) } /> }
        { errors[field.name] && <div className="error-message">{ errors[field.name] }</div> }
      </div>
    )
  }

  _getTextarea({ autoGrow, name, placeholder, rows, tabIndex }) {
    const { data, errors } = this.props
    return {
      autoGrow,
      defaultValue: data[name],
      error: errors[name],
      placeholder,
      rows,
      tabIndex,
      onChange: this._handleChange.bind(this, name)
    }
  }

  _getTextfield({ name, placeholder, tabIndex }) {
    const { data, errors } = this.props
    return {
      defaultValue: data[name],
      error: errors[name],
      placeholder,
      tabIndex,
      onChange: this._handleChange.bind(this, name)
    }
  }

  _getDatefield({ name, placeholder, tabIndex }) {
    const { data, errors } = this.props
    return {
      defaultValue: data[name],
      error: errors[name],
      placeholder,
      tabIndex,
      onChange: this._handleChange.bind(this, name)
    }
  }

  _getAddressfield({ name, placeholder, tabIndex }) {
    const { data, errors } = this.props
    return {
      defaultValue: data[name],
      error: errors[name],
      placeholder,
      tabIndex,
      onChange: this._handleChange.bind(this, name)
    }
  }

  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

}

export default Field
