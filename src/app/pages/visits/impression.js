import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

export class Impression extends React.Component {

  static propTypes = {
    impression: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { impression } = this.props
    return (
      <div className="impression">
        <div className="impression-header">
          <div className="impression-header-avatar">
            <img src={ impression.user.photo } />
          </div>
          <div className="impression-header-details">
            <strong>{ impression.user.full_name }</strong><br />
            { moment(impression.created_at).format('MMM DD, YYYY @ hh:mm A') }
          </div>
          <div className="impression-header-icon">
            <i className="fa fa-ellipsis-h" />
          </div>
        </div>
        <div className="impression-asset">
          <img src={ impression.asset } />
        </div>
        <div className="impression-caption">
          { impression.caption }
        </div>
      </div>
    )
  }


}

const mapResourcesToPage = (props, context, page) => ({
  impression: `/api/tours/${page.params.tour_id}/visits/${page.params.visit_id}/impressions/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Impression',
  component: Impression
})

export default Page(mapResourcesToPage, mapPropsToPage)
