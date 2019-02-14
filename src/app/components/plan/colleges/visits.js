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
          <div className="visit-bound">
            <div className="visit-bound-icon">
              <i className="fa fa-circle" />
            </div>
            <div className="visit-bound-details">
              322 S Geneva St,
              Ithaca, NY 14850
            </div>
          </div>
          <div className="visits">
            { visits.map((visit, index) => (
              <Visit { ...this._getVisit(visit, index) } key={`visit_${visit.college.id}`} />
            )) }
            <div className="visits-add" onClick={ this._handleChangeMode.bind(this, 'add') }>
              Add a college
            </div>
          </div>
          <div className="visit-bound">
            <div className="visit-bound-icon">
              <i className="fa fa-circle" />
            </div>
            <div className="visit-bound-details">
              322 S Geneva St,
              Ithaca, NY 14850
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getVisit(visit, index) {
    const { onReorder } = this.props
    return {
      visit,
      index,
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
