import PropTypes from 'prop-types'
import Avatar from '../avatar'
import Image from '../image'
import moment from 'moment'
import React from 'react'
import Edit from './edit'
class Impression extends React.Component {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    impression: PropTypes.object
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
        { impression.type === 'image' &&
          <div className="impression-image">
            <div className="impression-asset">
              <Image src={ impression.asset } />
            </div>
            <div className="impression-caption" dangerouslySetInnerHTML={{__html: impression.caption.replace(/\n/g, '<br />') }} />
          </div>
        }
        { impression.type === 'note' &&
          <div className="impression-note" dangerouslySetInnerHTML={{__html: impression.caption.replace(/\n/g, '<br />') }} />
        }
      </div>
    )
  }

  _handleTasks() {
    this.context.tasks.open([
      { label: 'Edit Impression', modal: Edit },
      { label: 'Delete Impression' }
    ])
  }

}

export default Impression
