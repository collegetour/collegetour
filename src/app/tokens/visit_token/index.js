import Image from '../../components/image'
import PropTypes from 'prop-types'
import React from 'react'

class VisitToken extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    visit: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { visit } = this.props
    return (
      <div className="list">
        <div className="visit-token">
          <div className="visit-token-logo">
            <Image src={ visit.college.logo } />
          </div>
          <div className="visit-token-details">
            <strong>{ visit.college.name }</strong><br />
            <span className="visit-token-details-location">
              { visit.college.city }, { visit.college.state }<br />
            </span>
          </div>
        </div>
      </div>
    )
  }

}

export default VisitToken
