export const save = (tour_id, visit_id, impressions) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${visit_id}/photos`,
  body: {
    impressions
  },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const addUpload = (file) => ({
  type: 'ADD_UPLOAD',
  file
})

export const updateUpload = (asset) => ({
  type: 'UPDATE_UPLOAD',
  asset
})

export const removeUploads = () => ({
  type: 'REMOVE_UPLOADS'
})

export const type = (index, caption) => ({
  type: 'TYPE',
  index,
  caption
})
