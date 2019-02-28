import VisitToken from '../../../tokens/visit_token'
import Message from '../../../components/message'
import PropTypes from 'prop-types'
import React from 'react'

class Visits extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    tracker: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    tour_id: PropTypes.string,
    visits: PropTypes.array
  }

  static defaultProps = {}

  _handleTrack = this._handleTrack.bind(this)

  render() {
    const { visits } = this.props
    if(visits.length === 0) return <Message { ...this._getEmpty() } />
    return (
      <div className="list">
        { visits.map((visit, index) => (
          <div className="list-item" key={`visit_${visit.id}`} onClick={ this._handleClick.bind(this, visit.id) }>
            <VisitToken visit={ visit } />
            <div className="list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(active !== prevProps.active && active) {
      this._handleTrack()
    }
  }

  _getEmpty() {
    return {
      icon: 'map',
      title: 'Plan Your Tour',
      text: 'Go ahead and add some college visits to your tour',
      component: <button className="ui basic fluid red button" onClick={ this._handlePlan }>Plan Tour</button>
    }
  }

  _handleClick(id) {
    const { tour_id } = this.props
    this.context.router.history.push(`/tours/${tour_id}/visits/${id}`)
  }

  _handleTrack() {
    const { tour_id } = this.props
    this.context.tracker.track('viewed visits', { tour_id })
  }

}

export default Visits
