import PropTypes from 'prop-types'
import Message from '../message'
import Form from '../form'
import React from 'react'

class Invitation extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    tour_id: PropTypes.string
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { tour_id } = this.props
    return {
      title: 'Invite Tourist',
      instructions: <Message { ...this._getInstructions() } />,
      method: 'POST',
      action: `/api/tours/${tour_id}/tourists`,
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

  _getInstructions() {
    return {
      icon: 'user',
      title: 'Invite Tourist',
      text: 'You can invite others to view or contribute to your tour. Just enter their contact information and we\'ll send them an invitation by email.'
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(tourist) {
    this.context.flash.set('success', `We sent an invitation to ${tourist.first_name}`)
    this.context.modal.close()
  }

}

export default Invitation
