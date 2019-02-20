import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getModalPanel() }>
      </ModalPanel>
    )
  }

  _getModalPanel() {
    return {
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Post', handler: this._handleSuccess }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Form
