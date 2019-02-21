import ModelPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'

class Tourists extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    page: PropTypes.object,
    tourists: PropTypes.array,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { tourists } = this.props
    return (
      <ModelPanel { ...this._getPanel() }>
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
            <div className="list">
              { tourists.map((tourist, index) => (
                <div className="list-item" key={`tourist_${index}`}>
                  <div className="tourist-token">
                    <div className="tourist-token-photo">
                      <Avatar user={ tourist.user } />
                    </div>
                    <div className="tourist-token-details">
                      <strong>{ tourist.user.full_name }</strong><br />
                      { tourist.user.email }
                    </div>
                    <div className="tourist-token-icon">
                      { tourist.claimed_at ?
                        <i className="fa fa-fw fa-check" /> :
                        <i className="fa fa-fw fa-clock-o" />
                      }
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>
      </ModelPanel>
    )
  }

  componentDidMount() {
    const { id } = this.props
    this.props.onFetch(id)
  }

  _getPanel() {
    return {
      title: 'Add Tourists',
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
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

  _handleCancel() {
    this.context.modal.close()
  }

  _handleType(key, e) {
    this.props.onType(key, e.target.value)
  }

  _handleSubmit() {
    const { email, first_name, last_name, page } = this.props
    this.props.onSave(page.params.tour_id, first_name, last_name, email)
  }

}

export default Tourists
