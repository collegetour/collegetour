import Form from '../../components/form'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

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
      title: 'New Tour',
      method: 'POST',
      action: `${process.env.API_HOST}/api/tours`,
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', instructions: 'Name to uniquely identify this tour' },
        { label: 'Origin', name: 'origin', type: 'textfield', instructions: 'Street address you will leave from' },
        { label: 'Destination', name: 'destination', type: 'textfield', instructions: 'Street address you will return to' },
        { label: 'Start Date', name: 'start_date', type: 'datefield', instructions: 'First day of your tour' },
        { label: 'End Date', name: 'end_date', type: 'datefield', instructions: 'Last day of your tour' }
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

export default New
