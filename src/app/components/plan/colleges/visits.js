import PropTypes from 'prop-types'
import Visit from './visit'
import React from 'react'

class Visits extends React.Component {

  static propTypes = {
    visits: PropTypes.array,
    status: PropTypes.string,
    onChangeMode: PropTypes.func,
    onFetch: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    const { visits } = this.props
    return (
      <div className="plan-sidebar-panel">
        <div className="plan-sidebar-panel-body">
          <div className="visits-bound">
            <strong>START:</strong> 322 S Geneva St,
            Ithaca, NY 14850
          </div>
          <div className="visits">
            { visits.map((visit, index) => (
              <Visit { ...this._getVisit(visit, index) } key={`visit_${visit.id}`} />
            )) }
            <div className="visits-add" onClick={ this._handleChangeMode.bind(this, 'add') }>
              Add a college
            </div>
          </div>
          <div className="visits-bound">
            <strong>END:</strong> 322 S Geneva St,
            Ithaca, NY 14850
          </div>
        </div>
      </div>
    )
  }

  _getVisit(visit, index) {
    const { onMove, onReorder } = this.props
    return {
      visit,
      index,
      onMove,
      onRemove: this._handleRemove.bind(this, index),
      onReorder
    }
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleChangeMode(mode) {
    this.props.onChangeMode(mode)
  }

}

export default Visits
