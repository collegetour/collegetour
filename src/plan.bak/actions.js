export const fetch = (prop, endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/data/tour.json',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
})

export const move = () => ({
  type: 'MOVE'
})

export const reorder = () => ({
  type: 'MOVE'
})
