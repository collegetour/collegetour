export const fetch = (network, query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/signin/${network}`,
  query,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
