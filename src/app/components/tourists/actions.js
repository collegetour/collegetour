export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `${process.env.API_HOST}/api/tours/${id}/tourists`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})


export const save = (tour_id, first_name, last_name, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/invitations`,
  body: {
    first_name,
    last_name,
    email
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
