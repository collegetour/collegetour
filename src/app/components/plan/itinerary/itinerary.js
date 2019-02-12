import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Schedule extends React.Component {

  static propTypes = {
    steps: PropTypes.array,
    itinerary: PropTypes.object,
    onNext: PropTypes.func,
    onPrev: PropTypes.func
  }

  static defaultProps = {
  }

  _handleNext = this._handleNext.bind(this)
  _handlePrev = this._handlePrev.bind(this)


  render() {
    const { itinerary } = this.props
    return (
      <div className="plan-panel">
        <div className="plan-panel-header">
          <h2>STEP 3: Adjust Itinerary</h2>
          <p>Based on your scheduled visits, we&apos;ve assembled the following
          itinerary for you. You can adjust the traveling to give yourself
          more or less time between visits</p>
        </div>
        <div className="plan-panel-body">
          <div className="plan-itinerary">

            { Object.keys(itinerary).map((date, index) => (
              <div className="plan-day" key={`day_${index}`}>
                <div className="plan-day-date">
                  { moment(date).format('dddd, MMMM DD, YYYY') }
                </div>
                <div className="plan-day-details">
                  { itinerary[date].map((item, index2) => (
                    <div className="plan-day-item" key={`day_item_${index2}`}>
                      <div className="plan-day-item-icon">
                        { item.type === 'drive' ?
                          <i className="fa fa-car" /> :
                          <i className="fa fa-clock-o" />
                        }
                      </div>
                      <div className="plan-day-item-details">
                        { item.text }
                        { item.type === 'drive' && index2 === itinerary[date].length - 1 &&
                          <span>(<span className="link">move to { moment(date).add(1,'day').format('dddd') }</span>)</span>
                        }
                        { item.type === 'drive' && index2 === 0 &&
                          <span>(<span className="link">move to { moment(date).subtract(1,'day').format('dddd') }</span>)</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )) }
          </div>
        </div>
        <div className="plan-panel-buttons">
          <div className="plan-panel-button">
            <div className="ui red fluid button" onClick={ this._handlePrev }>
              <i className="fa fa-chevron-left" /> Schedule Visits
            </div>
          </div>
          <div className="plan-panel-button">
            <div className="ui red fluid button" onClick={ this._handleNext }>
              Invite Family <i className="fa fa-chevron-right" />
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
