export const fetch = (prop, endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/data/colleges.json',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const query = (q) => ({
  type: 'QUERY',
  q
})
