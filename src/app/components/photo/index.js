import PropTypes from 'prop-types'
import React from 'react'

class Photo extends React.Component {

  static contextTypes = {
    uploader: PropTypes.object
  }

  static propTypes = {
    show: PropTypes.bool,
    tour_id: PropTypes.string,
    visit_id: PropTypes.string
  }

  static defaultProps = {}

  _handleBrowse = this._handleBrowse.bind(this)

  render() {
    return (
      <div className="tool">
        <i className="fa fa-camera" onClick={ this._handleBrowse } />
      </div>
    )
  }

  _handleBrowse() {
    const { tour_id, visit_id } = this.props
    this.context.uploader.browse(tour_id, visit_id)
  }

}

export default Photo
