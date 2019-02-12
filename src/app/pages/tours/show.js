import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

class Tour extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    visits: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { visits } = this.props
    return (
      <div className="visits">
        { visits.map((visit, index) => (
          <div className="visits-visit" key={`visit_${visit.id}`} onClick={ this._handleClick.bind(this, visit.id) }>
            <div className="visits-visit-logo">
              <img src={ visit.college.logo.url } />
            </div>
            <div className="visits-visit-details">
              <strong>{ visit.college.name }</strong><br />
              <span className="visits-visit-details-location">
                { visit.college.city }, { visit.college.state }<br />
              </span>
              <span className="visits-visit-details-timestamp">
                Visited { moment(visit.visit).format('MM/DD/YYYY') }
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

  _handleClick(id) {
    this.context.router.history.push(`/visits/${id}`)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  visits: `/api/tours/${page.params.id}/visits`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Tour',
  component: Tour
})

export default Page(mapResourcesToPage, mapPropsToPage)
