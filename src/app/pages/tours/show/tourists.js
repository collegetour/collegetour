import TouristToken from '../../../tokens/tourist_token'
import PropTypes from 'prop-types'
import React from 'react'

class Tourists extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    tourists: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { tourists } = this.props
    return (
      <div className="list">
        { tourists.map((tourist, index) => (
          <div className="list-item" key={`tourist_${index}`}>
            <TouristToken tourist={ tourist } />
          </div>
        )) }
      </div>
    )
  }

}

export default Tourists
