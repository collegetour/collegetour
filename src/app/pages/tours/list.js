import Message from '../../components/message'
import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Tours extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    tours: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { tours } = this.props
    if(tours.length === 0) return <Message { ...this._getEmpty() } />
    return (
      <div className="tours">
        { tours.map((tour, index) => (
          <div className="tours-tour" key={`tour_${tour.id}`} onClick={ this._handleClick.bind(this, tour.id) }>
            <div className="tours-tour-details">
              <strong>{ tour.name }</strong><br />
              { moment(tour.start_date).format('MM/DD/YYYY') }
            </div>
            <div className="tours-tour-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'car',
      title: 'Create a Tour',
      text: 'Set up a tour',
      component: <button className="ui basic fluid red button" onClick={ this._handlePlan }>Create Tour</button>
    }
  }

  _handleClick(id) {
    this.context.router.history.push(`/tours/${id}`)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  tours: '/api/tours'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'College Tourist',
  component: Tours,
  leftItems: [],
  rightItems: [
    { component: <img src="/images/greg.jpg" /> }
  ]
})

export default Page(mapResourcesToPage, mapPropsToPage)
