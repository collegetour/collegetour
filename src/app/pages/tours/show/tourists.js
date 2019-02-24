import TouristToken from '../../../tokens/tourist_token'
import PropTypes from 'prop-types'
import React from 'react'

class Tourists extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    presence: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    tourists: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { presence } = this.context
    const { tourists } = this.props
    return (
      <div className="list">
        { tourists.map((tourist, index) => (
          <div className="list-item" key={`tourist_${index}`}>
            <TouristToken tourist={ tourist } />
            { presence.user.id === tourist.tour.owner_id && tourist.user.id !== tourist.tour.owner_id &&
              <div className="list-item-proceed" onClick={ this._handleTasks.bind(this, tourist) }>
                <i className="fa fa-fw fa-ellipsis-v" />
              </div>
            }
          </div>
        )) }
      </div>
    )
  }

  _handleTasks(tourist) {
    const items = []
    if(!tourist.claimed_at) items.push({ label: 'Resend Invitation', request: this._getResend(tourist) })
    if(tourist.user.id !== tourist.tour.owner_id) items.push({ label: 'Remove Tourist', request: this._getRemove(tourist) })
    this.context.tasks.open(items)
  }

  _getRemove(tourist) {
    return {
      endpoint: `/api/tours/${tourist.tour.id}/tourists/${tourist.id}`,
      method: 'DELETE',
      onFailure: () => {
        this.context.flash.set('error', `Unable to remove ${tourist.user.first_name} from this tour`)
      },
      onSuccess: () => {
        this.context.flash.set('success', `${tourist.user.first_name} has been removed from this tour`)
      }
    }
  }

  _getResend(tourist) {
    return {
      endpoint: `/api/tours/${tourist.tour.id}/tourists/${tourist.id}/resend`,
      method: 'POST',
      onFailure: () => {
        this.context.flash.set('error', `Unable to resend an invitation to ${tourist.user.first_name}`)
      },
      onSuccess: () => {
        this.context.flash.set('success', `We resent an invitation to ${tourist.user.first_name}`)
      }
    }
  }

}

export default Tourists
