import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Note extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    show: PropTypes.bool,
    tour_id: PropTypes.string,
    visit_id: PropTypes.string    
  }

  static defaultProps = {}

  _handleNew = this._handleNew.bind(this)

  render() {
    return (
      <div className="note">
        <i className="fa fa-pencil" onClick={ this._handleNew } />
      </div>
    )
  }

  _handleNew() {
    const { tour_id, visit_id } = this.props
    this.context.modal.open(<New tour_id={ tour_id } visit_id={ visit_id } />)
  }

}

export default Note
