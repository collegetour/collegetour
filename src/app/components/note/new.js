import PropTypes from 'prop-types'
import React from 'react'
import Form from '../form'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    tour_id: PropTypes.string,
    visit_id: PropTypes.string
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { tour_id, visit_id } = this.props
    return {
      className: 'note-form',
      title: 'New Note',
      method: 'POST',
      action: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${visit_id}/notes`,
      submitText: 'Post',
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

export default New
