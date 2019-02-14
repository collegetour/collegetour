import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Visits from './visits'
import Add from './add'
import React from 'react'
import Map from './map'

class Colleges extends React.Component {

  static propTypes = {
    mode: PropTypes.string,
    tour_id: PropTypes.string,
    visits: PropTypes.array,
    onAddVisit: PropTypes.func,
    onChangeMode: PropTypes.func,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func
  }

  static defaultProps = {
  }

  _handleAddVisit = this._handleAddVisit.bind(this)
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
                <Add { ...this._getAdd() } />
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

  componentDidMount() {
    const { tour_id } = this.props
    this.props.onFetch(tour_id)
  }

  _handleAddVisit(visit) {
    this.props.onAddVisit(visit)
  }


  _getAdd() {
    const { onChangeMode } = this.props
    return {
      onAddVisit: this._handleAddVisit,
      onChangeMode
    }
  }

  _getMap() {
    const { visits } = this.props
    return {
      origin: '322 S Geneva St, Ithaca, NY',
      destination: '322 S Geneva St, Ithaca, NY',
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
