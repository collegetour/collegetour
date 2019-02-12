import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

class Impression extends React.Component {

  static propTypes = {
    impression: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { impression } = this.props
    return (
      <div className="impression">
        <div className="impression-header">
          <div className="impression-header-avatar">
            <img src={ impression.user.url } />
          </div>
          <div className="impression-header-details">
            <strong>{ impression.user.name }</strong><br />
            { moment(impression.created_at).format('MMM DD, YYYY') }
          </div>
        </div>
        <div className="impression-body">
          <img src={ impression.url } />
        </div>
      </div>
    )
  }


}

const mapResourcesToPage = (props, context, page) => ({
  impression: '/data/impression.json'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Impression',
  component: Impression
})

export default Page(mapResourcesToPage, mapPropsToPage)
