import { Page } from '../../../components/page'
import Avatar from '../../../components/avatar'
import PropTypes from 'prop-types'
import React from 'react'

class Tourists extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    tourists: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { tourists } = this.props
    return (
      <div className="tourists">
        <div className="tourists-header">
          <div className="ui form">
            <div className="field">
              <label>First Name</label>
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="text" name="last-name" placeholder="Email"/>
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

}

const mapResourcesToPage = (props, context, page) => ({
  tourists: `/api/tours/${page.params.id}/tourists`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Tourists',
  component: () => <Tourists tourists={ resources.tourists } />
})

export default Page(mapResourcesToPage, mapPropsToPage)
