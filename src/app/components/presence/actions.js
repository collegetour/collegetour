export const loadTourist = () => ({
  type: 'LOCAL_GET',
  key: 'tourist_id',
  request: 'LOAD_TOURIST_REQUEST',
  success: 'LOAD_TOURIST_SUCCESS',
  failure: 'LOAD_TOURIST_FAILURE'
})

export const removeTourist = () => ({
  type: 'LOCAL_REMOVE',
  key: 'tourist_id',
  request: 'REMOVE_TOURIST_REQUEST',
  success: 'REMOVE_TOURIST_SUCCESS',
  failure: 'REMOVE_TOURIST_FAILURE'
})

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
