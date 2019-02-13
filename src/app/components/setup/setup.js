import PropTypes from 'prop-types'
import React from 'react'

class Setup extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    status: PropTypes.string,
    onSave: PropTypes.func
  }

  static defaultProps = {
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="setup">
        <div className="setup-header">
          <h1><i className="fa fa-university" /></h1>
          <h3>Welcome to College Tourist!</h3>
          <p>Thanks for trying out our app! We&apos;re looking forward to helping you
            get the most out of your upcoming college tour! Before you get
            started, please verify your account information.</p>
        </div>
        <div className="setup-body">
          <div className="ui form">
            <div className="field">
              <label>First Name</label>
              <input type="text" name="first-name" placeholder="First Name" defaultValue="Greg" />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" name="last-name" placeholder="Last Name" defaultValue="Kops" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="text" name="last-name" placeholder="Email" defaultValue="mochini@gmail.com" />
            </div>
            <div className="field">
              <label>Photo</label>
              <div className="photo">
                <img src="/images/greg.jpg" />
              </div>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" className="hidden" />
                <label>I agree to the <a href="">Terms and Conditions</a></label>
              </div>
            </div>
            <button className="ui fluid red button" type="submit" onClick={ this._handleSubmit }>Get Started!</button>
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'saved') {
      this.context.presence.reload()
    }

  }

  _handleSubmit() {
    this.props.onSave({
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'mochini@gmail.com',
      agreed_to_terms: true
    })
  }

}

export default Setup
