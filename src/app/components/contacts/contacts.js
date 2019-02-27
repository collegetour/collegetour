import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Loader from '../loader'
import Button from '../button'
import React from 'react'

class Contacts extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    contacts: PropTypes.array,
    status: PropTypes.string,
    tour_id: PropTypes.string,
    tourists: PropTypes.array,
    onFetch: PropTypes.func,
    onInvite: PropTypes.func,
    onSetContacts: PropTypes.func
  }

  static defaultProps = {}

  _handleDone = this._handleDone.bind(this)
  _handleSetContacts = this._handleSetContacts.bind(this)

  render() {
    const { contacts, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="contacts">
          <div className="contacts-header">
            Below is a list of people from your phone&apos;s contact list, let
            us know who you&apos;d like to join this tour and we&apos;ll send
            them an invitation by email.
          </div>
          <div className="contacts-body">
            <div className="list">
              { contacts.map((contact, index) => (
                <div className="list-item" key={`contact_${index}`}>
                  <div className="contact-token">
                    <div className="contact-token-detail">
                      <strong>{ contact.first_name } { contact.last_name }</strong><br />
                      { contact.email }
                    </div>
                    <div className="contact-token-button">
                      { contact.invited ?
                        <span>INVITED</span> :
                        <Button { ...this._getButton(contact) } />
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { host } = this.context
    const { tour_id, onFetch } = this.props
    host.getContacts(this._handleSetContacts)
    onFetch(tour_id)
  }

  _getPanel() {
    return {
      title: 'Send Invitations',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getButton(contact) {
    return {
      label: 'SEND',
      className: 'ui small red button',
      handler: this._handleInvite.bind(this, contact)
    }
  }

  _getMessage() {
    return {
      color: 'green',
      icon: 'id-card-o',
      title: 'Access Contact List',
      text: 'If you give us access to your phone\'s contacts, we can let you choose people from your contact list. If not, you can still invite them manually.',
      buttons: [
        {
          label: 'No Thanks'
        },
        {
          label: 'Allow Access'
        }
      ]
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

  _handleInvite(contact) {
    const { tour_id } = this.props
    const { first_name, last_name, email } = contact
    this.props.onInvite(tour_id, first_name, last_name, email)
  }

  _handleSetContacts(contacts) {
    console.log(contacts)
    this.props.onSetContacts(contacts)
  }

}

export default Contacts
