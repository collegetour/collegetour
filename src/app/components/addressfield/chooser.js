import ModalPanel from '../modal_panel'
import { connect } from 'react-redux'
import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Chooser extends React.Component {

  static propTypes = {
    options: PropTypes.array,
    prompt: PropTypes.string,
    q: PropTypes.string,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func,
    onQuery: PropTypes.func,
    onSetOptions: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options, q } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="addressfield-chooser">
          <div className="addressfield-chooser-header">
            <Searchbox { ...this._getSearchbox() } />
          </div>
          <div className="addressfield-chooser-body">
            { options.length === 0 && q.length === 0 &&
              <Message { ...this._getMessage() } />
            }
            { options.length === 0 && q.length > 0 &&
              <Message { ...this._getEmpty() } />
            }
            { options.length > 0 &&
              <div className="addressfield-chooser-results">
                { options.map((option, index) => (
                  <div className="addressfield-chooser-result" key={`options_${index}`} onClick={ this._handleChoose.bind(this, option.description) }>
                    <div className="addressfield-chooser-result-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="addressfield-chooser-result-details">
                      <strong>{ option.structured_formatting.main_text }</strong><br />
                      { option.structured_formatting.secondary_text }
                    </div>
                  </div>
                )) }
              </div>
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.AutocompleteService()
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) {
      this.autocomplete.getPlacePredictions({
        input: q
      }, (options) => this.props.onSetOptions(options || []))
    }
  }
  _getPanel() {
    return {
      title: 'Choose Location',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getMessage() {
    return {
      title: 'Find a location',
      text: 'choose a location',
      icon: 'map'
    }
  }

  _getEmpty() {
    return {
      title: 'No locations',
      text: 'No locations matched your search',
      icon: 'times'
    }
  }

  _getSearchbox() {
    const { prompt } = this.props
    return {
      prompt,
      onChange: this._handleType
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(address) {
    this.props.onChoose(address)
  }

  _handleType(q) {
    this.props.onQuery(q)
  }

}

const mapStateToProps = (state, props) => state.addressfield[props.cid]

export default connect(mapStateToProps)(Chooser)
