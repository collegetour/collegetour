import Impression from '../../components/impression'
import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Show extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    impression: PropTypes.array,
    page: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    return <Impression { ...this._getImpression() } />
  }

  _getImpression() {
    const { page, impression } = this.props
    const { tour_id, visit_id } = page.params
    return {
      impression,
      tour_id,
      visit_id
    }
  }

}

const mapResourcesToPage = (props, context, page) => ({
  impression: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/visits/${page.params.visit_id}/impressions/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Impression',
  component: Show
})

export default Page(mapResourcesToPage, mapPropsToPage)
