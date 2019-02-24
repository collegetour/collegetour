import PropTypes from 'prop-types'
import React from 'react'
import Form from '../form'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Edit Account',
      method: 'PATCH',
      endpoint: `${process.env.API_HOST}/api/account`,
      action: `${process.env.API_HOST}/api/account`,
      submitText: 'Save',
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
        { label: 'Email', name: 'email', type: 'textfield', required: true }
      ],
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
