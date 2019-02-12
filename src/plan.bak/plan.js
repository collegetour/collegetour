import Itinerary from './itinerary'
import NewVisit from '../colleges'
import PropTypes from 'prop-types'
import React from 'react'
import Map from './map'

class Plan extends React.Component {

  static propTypes = {
    mode: PropTypes.string,
    visits: PropTypes.array,
    status: PropTypes.string,
    onChangeMode: PropTypes.func,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onReorder: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    const { mode, status } = this.props
    return (
      <div className="plan">
        <div className="plan-header">
          <h2>STEP 1: Choose Colleges</h2>
          <p>Add colleges to your list and use the map to put them in a sensible
            order. Don&apos;t worry yet about scheduling and timing, we&apos;ll
            get to that in the next step.</p>
        </div>
        <div className="plan-body">
          <div className="plan-sidebar">
            { mode === 'itinerary' && <Itinerary { ...this._getItinerary() } /> }
            { mode === 'visit' && <NewVisit { ...this._getColleges() } /> }
          </div>
          <div className="plan-map">
            { status === 'success' &&
              <Map { ...this._getMap() } />
            }
          </div>
        </div>
        <div className="plan-footer">
          <div className="plan-button" />
          <div className="plan-button">
            <div className="ui red fluid button">
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

  _getItinerary() {
    const { visits, onChangeMode, onMove, onReorder } = this.props
    return {
      visits,
      onChangeMode,
      onMove,
      onReorder
    }
  }

  _getMap() {
    const { visits } = this.props
    return {
      visits
    }
  }

  componentDidMount() {
    this.props.onFetch()
  }

}

export default Plan
