import PropTypes from 'prop-types'
import React from 'react'
import Form from '../form'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Note',
      method: 'POST',
      action: `${process.env.API_HOST}/api/tours/1/visits/1/notes`,
      submitText: 'Create',
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
