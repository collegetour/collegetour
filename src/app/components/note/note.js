import PropTypes from 'prop-types'
import React from 'react'

class Note extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="note">
        <i className="fa fa-pencil" />
      </div>
    )
  }

}

export default Note
