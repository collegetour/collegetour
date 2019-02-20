import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Note extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    show: PropTypes.bool
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
    this.context.modal.open(New)
  }

}

export default Note
