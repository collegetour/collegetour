import Image from '../../components/image'
import PropTypes from 'prop-types'
import React from 'react'

class Gallery extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    impressions: PropTypes.array,
    tour_id: PropTypes.string,
    visit_id: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { impressions } = this.props
    return (
      <div className="gallery">
        { impressions.filter(impression => impression.asset).map((impression, index) => (
          <div className="gallery-impression" key={`impression_${impression.id}`} onClick={ this._handleClick.bind(this, impression.id) }>
            <Image src={ impression.asset.url } transforms={{ w: 200, h: 200, fit: 'cover' }} />
          </div>
        )) }
      </div>
    )
  }

  _getImpression(impression) {
    const { tour_id, visit_id } = this.props
    return {
      impression,
      tour_id,
      visit_id
    }
  }

  _getMessage() {
    return {
      icon: 'institution',
      title: 'No impressions',
      text: 'No one has shared any impressions of this college yet'
    }
  }

  _handleClick(id) {
    const { history } = this.context.router
    const { tour_id, visit_id } = this.props
    history.push(`/tours/${tour_id}/visits/${visit_id}/impressions/${id}`)
  }

}

export default Gallery
