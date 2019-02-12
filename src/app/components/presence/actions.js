export const loadUser = () => ({
  type: 'LOCAL_GET',
  key: 'user',
  request: 'LOAD_USER_REQUEST',
  success: 'LOAD_USER_SUCCESS',
  failure: 'LOAD_USER_FAILURE'
})

export const saveUser = (user) => ({
  type: 'LOCAL_SET',
  key: 'user',
  value: user,
  request: 'SAVE_USER_REQUEST',
  success: 'SAVE_USER_SUCCESS',
  failure: 'SAVE_USER_FAILURE'
})

export const loadSession = (token) => ({
  type: 'API_REQUEST',
  method: 'GET',
  token,
  endpoint: '/api/session',
  request: 'LOAD_SESSION_REQUEST',
  success: 'LOAD_SESSION_SUCCESS',
  failure: 'LOAD_SESSION_FAILURE'
})
