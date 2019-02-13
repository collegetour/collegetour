import { Page } from '../../components/page'
import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
import React from 'react'

class Travelers extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    travelers: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { travelers } = this.props
    return (
      <div className="travelers">
        <div className="travelers-header">
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
        <div className="travelers-body">
          { travelers.map((traveler, index) => (
            <div className="travelers-traveler" key={`traveler_${index}`}>
              <div className="travelers-traveler-photo">
                <Avatar user={ traveler.user } />
              </div>
              <div className="travelers-traveler-details">
                <strong>{ traveler.user.full_name }</strong><br />
                { traveler.user.email }
              </div>
              <div className="travelers-traveler-icon">
                { traveler.claimed_at ?
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
  travelers: `/api/tours/${page.params.id}/travelers`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Travelers',
  component: () => <Travelers travelers={ resources.travelers } />
})

export default Page(mapResourcesToPage, mapPropsToPage)
