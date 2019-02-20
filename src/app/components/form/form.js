import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'
import _ from 'lodash'

class Form extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    errors: PropTypes.object,
    fields: PropTypes.array,
    method: PropTypes.string,
    panel: PropTypes.any,
    status: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onFetch: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  static defaultProps = {
    fields: [],
    title: ''
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush =  this._handlePush.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { fields, panel } = this.props
    return (
      <div className="form-container">
        <ModalPanel { ...this._getModalPanel() }>
          <div className={ this._getFormClasses() } ref={ node => this.form = node }>
            { fields.map((field, index) => (
              <Field key={`field_${index}`} { ...this._getField(field, index) } />
            )) }
          </div>
        </ModalPanel>
        <CSSTransition key="form-panel" in={ panel !== null } classNames="translatex" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="form-panel">
            { _.isFunction(panel) ? React.createElement(panel) : panel }
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    const { endpoint, onFetch } = this.props
    if(endpoint) onFetch(endpoint)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'saved') {
        this._handleSuccess()
      }
    }
  }

  getChildContext() {
    return {
      form: {
        push: this._handlePush,
        pop: this._handlePop
      }
    }
  }

  _getField(field, index) {
    const { data, errors } = this.props
    return {
      defaultValue: data[field.name],
      error: errors[field.name],
      field,
      onChange: this._handleChange
    }
  }

  _getFormClasses() {
    const classes = ['ui','form']
    return classes.join(' ')
  }

  _getModalPanel() {
    const { title } = this.props
    return {
      title,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Post', handler: this._handleSubmit }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(key, value) {
    this.props.onUpdateData(key, value)
  }

  _handlePop(num = 1) {
    this.props.onPop(num)
  }

  _handlePush(component) {
    this.props.onPush(component)
  }

  _handleSubmit() {
    const { action, data, method } = this.props
    this.props.onSave(method, action, data)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Form
