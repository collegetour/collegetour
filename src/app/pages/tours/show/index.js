import { Page } from '../../../components/page'
import Tabs from '../../../components/tabs'
import Itinerary from './itinerary'
import PropTypes from 'prop-types'
import Tourists from './tourists'
import Visits from './visits'
import Edit from '../edit'
import React from 'react'

class Tour extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object,
    tour: PropTypes.object,
    tourists: PropTypes.array,
    itinerary: PropTypes.object,
    visits: PropTypes.array
  }

  static defaultProps = {}

  render() {
    return <Tabs { ...this._getTabs() } />
  }

  _getTabs() {
    const { itinerary, page, tourists, visits } = this.props
    return {
      items: [
        { label: 'Visits', component: () => <Visits visits={ visits } tour_id={ page.params.tour_id } /> },
        { label: 'Tourists', component: () => <Tourists tourists={ tourists } tour_id={ page.params.tour_id } /> },
        { label: 'Itinerary', component: () => <Itinerary itinerary={ itinerary } tour_id={ page.params.tour_id } /> }
      ]
    }
  }

}

const mapResourcesToPage = (props, context, page) => ({
  tour: `${process.env.API_HOST}/api/tours/${page.params.tour_id}`,
  tourists: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/tourists`,
  itinerary: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/itinerary`,
  visits: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/visits`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.tour.name,
  component: Tour,
  tasks: {
    items: [
      { label: 'Edit Tour', modal: Edit },
      { label: 'Manage Plan' },
      { label: 'Invite Family' }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
