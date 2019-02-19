import Message from '../../../components/message'
import { Page } from '../../../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Tour extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object,
    visits: PropTypes.array
  }

  static defaultProps = {
  }

  _handlePlan = this._handlePlan.bind(this)

  render() {
    const { visits } = this.props
    if(visits.length === 0) return <Message { ...this._getEmpty() } />
    return (
      <div className="visits">
        { visits.map((visit, index) => (
          <div className="visits-visit" key={`visit_${visit.id}`} onClick={ this._handleClick.bind(this, visit.id) }>
            <div className="visits-visit-logo">
              <img src={ visit.college.logo } />
            </div>
            <div className="visits-visit-details">
              <strong>{ visit.college.name }</strong><br />
              <span className="visits-visit-details-location">
                { visit.college.city }, { visit.college.state }<br />
              </span>
            </div>
            <div className="visits-visit-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'map',
      title: 'Plan Your Tour',
      text: 'Go ahead and add some college visits to your tour',
      component: <button className="ui basic fluid red button" onClick={ this._handlePlan }>Plan Tour</button>
    }
  }

  _handlePlan() {
    const { page } = this.props
    this.context.router.history.push(`/tours/${page.params.tour_id}/plan`)
  }

  _handleClick(id) {
    const { page } = this.props
    this.context.router.history.push(`/tours/${page.params.tour_id}/visits/${id}`)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  tour: `${process.env.API_HOST}/api/tours/${page.params.tour_id}`,
  visits: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/visits`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.tour.name,
  component: Tour
})

export default Page(mapResourcesToPage, mapPropsToPage)
