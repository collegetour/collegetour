import { Page } from '../../../components/page'
import Invite from '../../../components/invite'
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
        { label: 'Colleges', component: () => <Visits visits={ visits } tour_id={ page.params.tour_id } /> },
        { label: 'Tourists', component: () => <Tourists tourists={ tourists } tour_id={ page.params.tour_id } /> },
        { label: 'Itinerary', component: () => <Itinerary itinerary={ itinerary } tour_id={ page.params.tour_id } /> }
      ]
    }
  }

}

const mapResourcesToPage = (props, context, page) => ({
  tour: `/api/tours/${page.params.tour_id}`,
  tourists: `/api/tours/${page.params.tour_id}/tourists`,
  itinerary: `/api/tours/${page.params.tour_id}/itinerary`,
  visits: `/api/tours/${page.params.tour_id}/visits`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.tour.name,
  component: Tour,
  tasks: context.presence.user.id === resources.tour.owner.id ? {
    items: [
      { label: 'Edit Tour', modal: () => <Edit id={ page.params.tour_id } /> },
      { label: 'Manage Tour' },
      { label: 'Invite Tourists', modal: () => <Invite tour_id={ page.params.tour_id } /> }
    ]
  } : null
})

export default Page(mapResourcesToPage, mapPropsToPage)
