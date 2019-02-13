export const save = (body) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  body,
  endpoint: '/api/account',
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})
