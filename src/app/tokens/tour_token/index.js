import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class TourToken extends React.Component {

  static propTypes = {
    tour: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { tour } = this.props
    return (
      <div className="tour-token">
        <div className="tour-token-details">
          <strong>{ tour.name }</strong><br />
          { moment(tour.start_date).format('MM/DD/YYYY') }
        </div>
        <div className="tour-token-proceed">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    )
  }

}

export default TourToken
