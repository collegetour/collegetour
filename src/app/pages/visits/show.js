import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Visit extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { impressions } = this.props
    return (
      <div className="visit">
        <div className="visit-photos">
          <div className="visit-photos-header">
            <div className="visit-photos-displays">
              <div className="visit-photos-display">
                <i className="fa fa-th" />
              </div>
              <div className="visit-photos-display">
                <i className="fa fa-list-ul" />
              </div>
            </div>
          </div>
          <div className="visit-photos-body">
            { impressions.map((impression, index) => (
              <div className={`visit-${impression.type}`} key={`impression_${impression.id}`} onClick={ this._handleClick.bind(this, impression.id) }>
                <img src={ impression.url } />
                { impression.type === 'video' && <i className="fa fa-play" /> }
              </div>
            )) }
          </div>
        </div>
      </div>
    )
  }

  _handleClick(id) {
    this.context.router.history.push(`/tours/${id}/visits/${id}/impressions/${id}`)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  impressions: '/data/visit.json'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Visit',
  component: Visit
})

export default Page(mapResourcesToPage, mapPropsToPage)
