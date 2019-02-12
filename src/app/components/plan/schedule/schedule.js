import PropTypes from 'prop-types'
import React from 'react'

class Schedule extends React.Component {

  static propTypes = {
    visits: PropTypes.array,
    onNext: PropTypes.func,
    onPrev: PropTypes.func
  }

  static defaultProps = {
  }

  _handleNext = this._handleNext.bind(this)
  _handlePrev = this._handlePrev.bind(this)


  render() {
    const { visits } = this.props
    return (
      <div className="plan-panel">
        <div className="plan-panel-header">
          <h2>STEP 2: Schedule Visits</h2>
          <p>Most colleges require you to register in advance for an information
          session and/or college tour. Use the links below to visit each
          website and schedule your visit and then record the times below.</p>
        </div>
        <div className="plan-panel-body">
          <div className="plan-schedule">
            { visits.map((visit, index) => (
              <div className="visit-token" key={`visit_${index}`}>
                <div className="visit-token-logo">
                  <img src={ visit.college.logo } />
                </div>
                <div className="visit-token-details">
                  <strong>{ visit.college.name }</strong><br />
                  <span className="link">Schedule a visit</span><br />
                  <div className="plan-schedule-appointment">
                    INFO SESSION:
                    <input type="time" value="" /><br />
                  </div>
                  <div className="plan-schedule-appointment">
                    COLLEGE TOUR:
                    <input type="time" value="" /><br />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="plan-panel-buttons">
          <div className="plan-panel-button">
            <div className="ui red fluid button" onClick={ this._handlePrev }>
              <i className="fa fa-chevron-left" /> Choose Colleges
            </div>
          </div>
          <div className="plan-panel-button">
            <div className="ui red fluid button" onClick={ this._handleNext }>
              Finalize Itinerary <i className="fa fa-chevron-right" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleNext() {
    this.props.onNext()
  }

  _handlePrev() {
    this.props.onPrev()
  }

}

export default Schedule
