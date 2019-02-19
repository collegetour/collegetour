export const save = (tour_id, visit_id, asset_id, caption) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${visit_id}/impressions`,
  body: {
    asset_id,
    caption
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

export const removeUpload = () => ({
  type: 'REMOVE_UPLOAD'
})

export const type = (caption) => ({
  type: 'TYPE',
  caption
})
