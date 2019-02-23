import TourToken from '../../tokens/tour_token'
import Message from '../../components/message'
import { Page } from '../../components/page'
import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Tours extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    tours: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { tours } = this.props
    if(tours.length === 0) return <Message { ...this._getEmpty() } />
    return (
      <div className="list">
        { tours.map((tour, index) => (
          <div className="list-item" key={`tour_${tour.id}`} onClick={ this._handleClick.bind(this, tour.id) }>
            <TourToken tour={ tour } />
          </div>
        )) }
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'car',
      title: 'Create a Tour',
      text: 'Set up a tour',
      component: <button className="ui basic fluid red button" onClick={ this._handlePlan }>Create Tour</button>
    }
  }

  _handleClick(id) {
    this.context.router.history.push(`/tours/${id}/visits`)
  }

}

const mapResourcesToPage = (props, context, page) => ({
  tours: `${process.env.API_HOST}/api/tours`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Tours',
  component: Tours,
  leftItems: [
    { component: (
      <div onClick={ context.portal.toggleAccount }>
        <Avatar user={ context.presence.user } />
      </div>
    ) }
  ],
  task: {
    modal: New
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
