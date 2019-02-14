import Avatar from '../avatar'
import PropTypes from 'prop-types'
import React from 'react'

class Tourists extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    page: PropTypes.object,
    tourists: PropTypes.array,
    onSave: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { tourists } = this.props
    return (
      <div className="tourists">
        <div className="tourists-header">
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
            <button className="ui fluid red button" type="submit" onClick={ this._handleSubmit }>Send Invitation</button>
          </div>
        </div>
        <div className="tourists-body">
          { tourists.map((tourist, index) => (
            <div className="tourists-tourist" key={`tourist_${index}`}>
              <div className="tourists-tourist-photo">
                <Avatar user={ tourist.user } />
              </div>
              <div className="tourists-tourist-details">
                <strong>{ tourist.user.full_name }</strong><br />
                { tourist.user.email }
              </div>
              <div className="tourists-tourist-icon">
                { tourist.claimed_at ?
                  <i className="fa fa-fw fa-check" /> :
                  <i className="fa fa-fw fa-clock-o" />
                }
              </div>
            </div>
          )) }
        </div>
      </div>
    )
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

  _handleType(key, e) {
    this.props.onType(key, e.target.value)
  }

  _handleSubmit() {
    const { email, first_name, last_name, page } = this.props
    this.props.onSave(page.params.id, first_name, last_name, email)
  }

}

export default Tourists
