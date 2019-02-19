export const fetch = (q) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `${process.env.API_HOST}/api/colleges`,
  query: { q },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const query = (q) => ({
  type: 'QUERY',
  q
})
