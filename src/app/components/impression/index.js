import PropTypes from 'prop-types'
import Avatar from '../avatar'
import Image from '../image'
import moment from 'moment'
import React from 'react'
import EditNote from '../note/edit'

class Impression extends React.Component {

  static contextTypes = {
    presence: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    impression: PropTypes.object,
    tour_id: PropTypes.string,
    visit_id: PropTypes.string
  }

  static defaultProps = {}

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { presence } = this.context
    const { impression } = this.props
    return (
      <div className="impression">
        <div className="impression-header">
          <div className="impression-header-avatar">
            <Avatar user={ impression.user } size="50" />
          </div>
          <div className="impression-header-details">
            <div><strong>{ impression.user.full_name }</strong></div>
            { impression.college.name &&
              <div>{ impression.college.name }, { impression.college.city }, { impression.college.state }</div>
            }
            <div>{ moment(impression.created_at).format('MMM DD, YYYY @ hh:mm A') }</div>
          </div>
          { impression.user.id === presence.user.id &&
            <div className="impression-header-icon" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-h" />
            </div>
          }
        </div>
        { impression.type === 'photo' &&
          <div className="impression-photo">
            <div className="impression-asset" style={ this._getStyle(impression.asset) }>
              <Image src={ impression.asset.url } transforms={{ w: 480 }} />
            </div>
          </div>
        }
        { impression.type === 'note' &&
          <div className="impression-note" dangerouslySetInnerHTML={{__html: this._getCaption(impression.text) }} />
        }
      </div>
    )
  }

  _getCaption(text) {
    return text ? text.replace(/\n/g, '<br />')  : ''
  }

  _getStyle(asset) {
    if(!asset.width || !asset.height) return {}
    return {
      height: 0,
      paddingBottom: (asset.height / asset.width) * 100 + '%'
    }
  }

  _getNoteItems() {
    const { impression, tour_id, visit_id } = this.props
    return [
      { label: 'Edit Note', modal: <EditNote tour_id={ tour_id } visit_id={ visit_id } id={ impression.id } /> },
      { label: 'Delete Note', request: {
        method: 'delete',
        endpoint: `/api/tours/${tour_id}/visits/${ visit_id }/impressions/${impression.id}`,
        onSuccess: () => {},
        onError: () => {}
      }}
    ]
  }

  _getPhotoItems() {
    const { impression, tour_id, visit_id } = this.props
    return [
      { label: 'Delete Photo', request: {
        method: 'delete',
        endpoint: `/api/tours/${tour_id}/visits/${ visit_id }/impressions/${impression.id}`,
        onSuccess: () => {},
        onError: () => {}
      } }
    ]
  }

  _getReviewItems() {
    const { impression, tour_id, visit_id } = this.props
    return [
      { label: 'Delete Review', request: {
        method: 'delete',
        endpoint: `/api/tours/${tour_id}/visits/${ visit_id }/impressions/${impression.id}`,
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
