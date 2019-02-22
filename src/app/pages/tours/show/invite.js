import Form from '../../../components/form'
import PropTypes from 'prop-types'
import React from 'react'

class Invite extends React.Component {

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
      title: 'Invite Tourist',
      instructions: 'Enter the contact information and we\'ll send them an invitation by email',
      method: 'POST',
      action: `${process.env.API_HOST}/api/tours/${id}/invitations`,
      submitText: 'Invite',
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

export default Invite
