import PropTypes from 'prop-types'
import Avatar from '../avatar'
import Image from '../image'
import moment from 'moment'
import React from 'react'
import EditNote from '../note/edit'
import EditPhoto from '../photo/edit'

class Impression extends React.Component {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    impression: PropTypes.object,
    tour_id: PropTypes.number,
    visit_id: PropTypes.number
  }

  static defaultProps = {}

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { impression } = this.props
    return (
      <div className="impression">
        <div className="impression-header">
          <div className="impression-header-avatar">
            <Avatar user={ impression.user } />
          </div>
          <div className="impression-header-details">
            <strong>{ impression.user.full_name }</strong><br />
            { moment(impression.created_at).format('MMM DD, YYYY @ hh:mm A') }
          </div>
          <div className="impression-header-icon" onClick={ this._handleTasks }>
            <i className="fa fa-ellipsis-h" />
          </div>
        </div>
        { impression.type === 'photo' &&
          <div className="impression-photo">
            <div className="impression-asset">
              <Image src={ impression.asset } />
            </div>
            <div className="impression-caption" dangerouslySetInnerHTML={{__html: impression.text.replace(/\n/g, '<br />') }} />
          </div>
        }
        { impression.type === 'note' &&
          <div className="impression-note" dangerouslySetInnerHTML={{__html: impression.text.replace(/\n/g, '<br />') }} />
        }
      </div>
    )
  }

  _getNoteItems() {
    const { impression, tour_id, visit_id } = this.props
    return [
      { label: 'Edit Note', modal: <EditNote id={ impression.id } /> },
      { label: 'Delete Note', request: {
        method: 'delete',
        endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${ visit_id }/impressions/${impression.id}`,
        onSuccess: () => {},
        onError: () => {}
      }}
    ]
  }

  _getPhotoItems() {
    const { impression, tour_id, visit_id } = this.props
    return [
      { label: 'Edit Photo', modal: EditPhoto },
      { label: 'Delete Photo', request: {
        method: 'delete',
        endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${ visit_id }/impressions/${impression.id}`,
        onSuccess: () => {},
        onError: () => {}
      } }
    ]
  }

  _getReviewItems() {
    return [
      { label: 'Edit Review', modal: EditPhoto },
      { label: 'Delete Review', request: {
        method: 'delete',
        endpoint: `${process.env.API_HOST}/api/tours/1/visits/1/impressions/1`,
        onSuccess: () => {},
        onError: () => {}
      } }
    ]
  }

  _getItems() {
    const { impression } = this.props
    if(impression.type === 'note') return this._getNoteItems()
    if(impression.type === 'photo') return this._getPhotoItems()
    if(impression.type === 'review') return this._getReviewItems()
  }

  _handleTasks() {
    this.context.tasks.open(this._getItems())
  }

}

export default Impression
