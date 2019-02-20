import PropTypes from 'prop-types'
import React from 'react'
import Form from '../form'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Note',
      method: 'POST',
      endpoint: `${process.env.API_HOST}/api/tours/1/visits/1/impressions/${id}`,
      action: `${process.env.API_HOST}/api/tours/1/visits/1/impressions/${id}`,
      fields: [
        { name: 'text', type: 'textarea', placeholder: 'Enter your notes or record your impressions', rows: 22 }
      ],
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSave() {
    this.context.modal.close()
  }

}

export default Edit
