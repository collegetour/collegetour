import { createSelector } from 'reselect'
import _ from 'lodash'

const withoutInvites = (state, props) => state.contacts

const tourists = (state, props) => state.tourists

export const contacts = createSelector(
  withoutInvites,
  tourists,
  (contacts, tourists) => contacts.map(contact => ({
    ...contact,
    invited: _.find(tourists, { email: contact.email }) !== undefined
  })).filter(contact => {
    return contact.first_name !== null && contact.last_name !== null && contact.email !== null
  }).sort((a, b) => {
    if(a.last_name < b.last_name) return -1
    if(a.last_name > b.last_name) return 1
    return 0
  })
)
