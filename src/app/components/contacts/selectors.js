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
  }))
)
