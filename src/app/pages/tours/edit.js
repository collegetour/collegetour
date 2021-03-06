import Form from '../../components/form'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.string
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Tour',
      method: 'PATCH',
      endpoint: `/api/tours/${id}`,
      action: `/api/tours/${id}`,
      submitText: 'Save',
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Name to uniquely identify this tour' },
        { label: 'Origin', name: 'origin', type: 'addressfield', required: true, placeholder: 'Street address you will leave from' },
        { label: 'Destination', name: 'destination', type: 'addressfield', required: true, placeholder: 'Street address you will return to' }
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
