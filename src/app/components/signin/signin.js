import PropTypes from 'prop-types'
import React from 'react'

class Signin extends React.Component {

  static contextTypes = {}

  static propTypes = {
    error: PropTypes.object,
    status: PropTypes.string,
    onSignin: PropTypes.func
  }

  static defaultProps = {
  }

  email = null
  password = null

  _handleShake = this._handleShake.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { error } = this.props
    return (
      <form className={ this._getFormClass() } onSubmit={ this._handleSubmit }>
        { error &&
          <span>{ error }</span>
        }
        <div className="field">
          <div className="ui fluid left icon input">
            <i className="user icon"></i>
            <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Email" type="text" ref={ (node) => this.email = node } />
          </div>
        </div>
        <div className="field">
          <div className="ui fluid left icon input">
            <i className="lock icon"></i>
            <input className="form-control" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Password" type="text" ref={ (node) => this.password = node } />
          </div>
        </div>
        <div className="field button-field">
          <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>
            Continue <i className="right chevron icon" />
          </button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    // this.props.onSet(null, null, 'team')
    setTimeout(() => this.email.focus(), 500)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleShake()
      if(status === 'success') this._handleNext()
    }
  }

  _getFormClass() {
    const { error } = this.props
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSubmit(e) {
    const { onSignin } = this.props
    const email = this.email.value
    const password = this.password.value
    onSignin(email, password)
    e.preventDefault()
  }
}

export default Signin
