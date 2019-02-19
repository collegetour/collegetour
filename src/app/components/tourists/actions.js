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
