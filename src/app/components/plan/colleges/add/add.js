import SearchBox from '../../../searchbox'
import Message from '../../../message'
import PropTypes from 'prop-types'
import React from 'react'

class Colleges extends React.Component {

  static propTypes = {
    colleges: PropTypes.array,
    q: PropTypes.string,
    status: PropTypes.string,
    onAddVisit: PropTypes.func,
    onChangeMode: PropTypes.func,
    onFetch: PropTypes.func,
    onQuery: PropTypes.func
  }

  _handleQuery = this._handleQuery.bind(this)

  render() {
    const { colleges, q, status } = this.props
    return (
      <div className="colleges-add">
        <div className="colleges-add-header">
          <SearchBox { ...this._getSearchbox() } />
        </div>
        { q.length == 0 &&
          <Message { ...this._getMessage() } />
        }
        { status === 'failure' &&
          <Message { ...this._getFailure() } />
        }
        { status === 'success' && q.length > 0 && colleges.length === 0 &&
          <Message { ...this._getEmpty() } />
        }
        { status === 'success' && q.length > 0 &&
          <div className="colleges-add-body">
            { colleges.map((college, index) => (
              <div className="visit-token" key={`visit_${college.id}`} onClick={ this._handleClick.bind(this, college) }>
                <div className="visit-token-logo">
                  <img src={ college.logo } />
                </div>
                <div className="visit-token-details">
                  <strong>{ college.name }</strong><br />
                  <span className="visit-token-details-location">
                    { college.city }, { college.state }<br />
                  </span>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) {
      this.props.onFetch(q)
    }
  }

  _getEmpty() {
    return {
      title: 'No Results',
      text: 'We couldnt find any colleges that matched your criteria',
      icon: 'times'
    }
  }

  _getFailure() {
    return {
      title: 'Request Failed',
      text: 'We couldnt find any colleges that matched your criteria',
      icon: 'warning'
    }
  }

  _getMessage() {
    return {
      title: 'Select a college',
      text: 'Search through our database of colleges-add and universities',
      icon: 'university'
    }
  }

  _getSearchbox() {
    return {
      prompt: 'Search by name, city, or state',
      onChange: this._handleQuery
    }
  }

  _handleQuery(q) {
    this.props.onQuery(q)
  }

  _handleClick(college) {
    this.props.onAddVisit({ college })
    this.props.onChangeMode('itinerary')
  }

}

export default Colleges
