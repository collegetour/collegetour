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
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Tour',
      instructions: (
        <div className="invitation">
          <i className="fa fa-fw fa-map" />
          Let plan a college tour! To begin, give your tour a memorable name
          like &quot;Spring Break Tour&quot; and indicate the locations where
          you will begin and end.
        </div>
      ),
      method: 'POST',
      action: `${process.env.API_HOST}/api/tours`,
      submitText: 'Create',
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

export default New
