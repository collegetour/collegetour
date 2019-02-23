import PropTypes from 'prop-types'
import React from 'react'
import Form from '../form'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    tour_id: PropTypes.string,
    visit_id: PropTypes.string,
    id: PropTypes.string
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { tour_id, visit_id, id } = this.props
    return {
      className: 'note-form',
      title: 'Edit Note',
      method: 'PATCH',
      endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${visit_id}/impressions/${id}`,
      action: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${visit_id}/impressions/${id}`,
      submitText: 'Save',
      fields: [
        { name: 'text', type: 'textarea', placeholder: 'Enter your notes or record your impressions', autoGrow: true }
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
