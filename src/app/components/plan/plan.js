import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Colleges from './colleges'
import Schedule from './schedule'
import Itinerary from './itinerary'
import React from 'react'

class Plan extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    tour_id: PropTypes.string,
    step: PropTypes.number,
    onChangeStep: PropTypes.func,
    onFetch: PropTypes.func
  }

  static defaultProps = {
    tour_id: '1'
  }

  render() {
    const { step } = this.props
    return (
      <div className="plan">
        <div className="plan-panel">
          <Colleges { ...this._getColleges() } />
        </div>
        <CSSTransition in={ step > 1 } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <div className="plan-panel">
            <Schedule { ...this._getSchedule() } />
          </div>
        </CSSTransition>
        <CSSTransition in={ step > 2 } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <div className="plan-panel">
            <Itinerary { ...this._getItinerary() } />
          </div>
        </CSSTransition>
      </div>
    )
  }

  _getColleges() {
    const { tour_id, onChangeStep } = this.props
    return {
      tour_id,
      onNext: onChangeStep.bind(this, 2)
    }
  }

  _getSchedule() {
    const { tour_id, onChangeStep } = this.props
    return {
      tour_id,
      onPrev: onChangeStep.bind(this, 1),
      onNext: onChangeStep.bind(this, 3)
    }
  }

  _getItinerary() {
    const { tour_id, onChangeStep } = this.props
    return {
      tour_id,
      onPrev: onChangeStep.bind(this, 2),
      onNext: onChangeStep.bind(this, 4)
    }
  }

}

export default Plan
