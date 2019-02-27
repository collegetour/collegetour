export const fetch = (tour_id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/tours/${tour_id}/tourists`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const setContacts = (contacts) => ({
  type: 'SET_CONTACTS',
  contacts
})

export const invite = (tour_id, first_name, last_name, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body: { first_name, last_name, email },
  endpoint: `/api/tours/${tour_id}/tourists`,
  request: 'INVITE_REQUEST',
  success: 'INVITE_SUCCESS',
  failure: 'INVITE_FAILURE'
})
