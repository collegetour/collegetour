import PropTypes from 'prop-types'
import Image from '../image'
import React from 'react'

class Setup extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    agreed_to_terms: PropTypes.bool,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
    status: PropTypes.string,
    onAgree: PropTypes.func,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
  }

  _handleAgree = this._handleAgree.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { photo } = this.props
    return (
      <div className="setup">
        <div className="setup-header">
          <div className="container">
            <h1><i className="fa fa-university" /></h1>
            <h3>Welcome to College Tourist!</h3>
            <p>Thanks for trying out our app! We&apos;re looking forward to helping you
              get the most out of your upcoming college tour! Before you get
              started, please verify your account information.</p>
          </div>
        </div>
        <div className="setup-body">
          <div className="container">
            <div className="ui form">
              <div className="field">
                <label>First Name</label>
                <input type="text" { ...this._getFirstName() } />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input type="text" { ...this._getLastName() } />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="text" { ...this._getEmail() }  />
              </div>
              <div className="field">
                <label>Photo</label>
                <div className="photo">
                  <Image src={ photo } transforms={{ w: 150, height: 150, fit: 'cover' }} />
                </div>
              </div>
              <div className="field">
                <i { ...this._getTerms() } />
                I agree to the <a href="">Terms and Conditions</a>
              </div>
              <button className="ui fluid red button" type="submit" onClick={ this._handleSubmit }>Get Started!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'saved') {
      this.context.presence.reload()
    }

  }

  _getFirstName() {
    const { first_name } = this.props
    return {
      placeholder: 'First Name',
      value: first_name,
      onChange: this._handleType.bind(this, 'first_name')
    }
  }

  _getLastName() {
    const { last_name } = this.props
    return {
      placeholder: 'Last Name',
      value: last_name,
      onChange: this._handleType.bind(this, 'last_name')
    }
  }

  _getEmail() {
    const { email } = this.props
    return {
      placeholder: 'Email',
      value: email,
      onChange: this._handleType.bind(this, 'email')
    }
  }

  _getTerms() {
    const { agreed_to_terms } = this.props
    return {
      className: agreed_to_terms ? 'fa fa-check-circle' : 'fa fa-circle-o',
      onClick: this._handleAgree
    }
  }

  _handleAgree() {
    const { agreed_to_terms } = this.props
    this.props.onAgree(!agreed_to_terms)
  }

  _handleSubmit() {
    const { email, first_name, last_name, agreed_to_terms } = this.props
    this.props.onSave(first_name, last_name, email, agreed_to_terms)
  }

  _handleType(key, e) {
    this.props.onType(key, e.target.value)
  }

}

export default Setup
