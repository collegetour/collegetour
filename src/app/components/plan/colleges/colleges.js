import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Visits from './visits'
import Add from './add'
import React from 'react'
import Map from './map'

class Colleges extends React.Component {

  static propTypes = {
    mode: PropTypes.string,
    visits: PropTypes.array,
    onChangeMode: PropTypes.func,
    onMove: PropTypes.func,
    onNext: PropTypes.func,
    onReorder: PropTypes.func
  }

  static defaultProps = {
  }

  _handleNext = this._handleNext.bind(this)

  render() {
    const { mode } = this.props
    return (
      <div className="plan-panel">
        <div className="plan-panel-header">
          <h2>STEP 1: Choose Colleges</h2>
          <p>Add colleges to your list and use the map to put them in a sensible
            order. Don&apos;t worry yet about scheduling and timing, we&apos;ll
            get to that in the next step.</p>
        </div>
        <div className="plan-panel-body">
          <div className="plan-sidebar">
            <Visits { ...this._getVisits() } />
            <CSSTransition in={ mode === 'add'} classNames="slide" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
              <div className="plan-sidebar-panel">
                <Add { ...this._getColleges() } />
              </div>
            </CSSTransition>
          </div>
          <div className="plan-map">
            <Map { ...this._getMap() } />
          </div>
        </div>
        <div className="plan-panel-buttons">
          <div className="plan-panel-button" />
          <div className="plan-panel-button">
            <div className="ui red fluid button" onClick={ this._handleNext }>
              Schedule Visits <i className="fa fa-chevron-right" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getColleges() {
    const { onChangeMode } = this.props
    return {
      onChangeMode
    }
  }

  _getMap() {
    const { visits } = this.props
    return {
      visits
    }
  }

  _getVisits() {
    const { visits, onChangeMode, onMove, onRemove, onReorder } = this.props
    return {
      visits,
      onChangeMode,
      onMove,
      onRemove,
      onReorder
    }
  }

  _handleNext() {
    this.props.onNext()
  }

}

export default Colleges
