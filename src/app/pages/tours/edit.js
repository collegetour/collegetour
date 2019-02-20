import Form from '../../components/form'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Edit Tour',
      method: 'PATCH',
      action: `${process.env.API_HOST}/api/tours`,
      fields: [
        { label: 'Name', name: 'name', type: 'textfield' },
        { label: 'Origin', name: 'origin', type: 'textfield' },
        { label: 'Destination', name: 'destination', type: 'textfield' },
        { label: 'Start Date', name: 'start_date', type: 'textfield' },
        { label: 'End Date', name: 'end_date', type: 'textfield' }
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
