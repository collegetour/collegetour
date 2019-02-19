export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `${process.env.API_HOST}/api/tours/${id}/visits`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
})

export const addVisit = (visit) => ({
  type: 'ADD_VISIT',
  visit
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const reorder = (from, to) => ({
  type: 'REORDER',
  from,
  to
})
