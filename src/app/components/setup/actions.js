export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/account',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const save = (first_name, last_name, email, photo_id, agreed_to_terms) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: '/api/account',
  body: {
    first_name,
    last_name,
    email,
    photo_id,
    agreed_to_terms
  },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const type = (key, value) => ({
  type: 'TYPE',
  key,
  value
})
