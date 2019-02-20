import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    errors: PropTypes.object,
    fields: PropTypes.array,
    method: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  static defaultProps = {
    fields: [],
    title: ''
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { fields } = this.props
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className={ this._getFormClasses() } ref={ node => this.form = node }>
          { fields.map((field, index) => (
            <Field key={`field_${index}`} { ...this._getField(field, index) } />
          )) }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { endpoint, onFetch } = this.props
    if(endpoint) onFetch(endpoint)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'saved') {
        this._handleSuccess()
      }
    }
  }

  _getField(field, index) {
    const { data, errors } = this.props
    return {
      defaultValue: data[field.name],
      error: errors[field.name],
      field,
      onChange: this._handleChange
    }
  }

  _getFormClasses() {
    const classes = ['ui','form']
    return classes.join(' ')
  }

  _getModalPanel() {
    const { title } = this.props
    return {
      title,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Post', handler: this._handleSubmit }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(key, value) {
    this.props.onUpdateData(key, value)

  }

  _handleSubmit() {
    const { action, data, method } = this.props
    this.props.onSave(method, action, data)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Form
