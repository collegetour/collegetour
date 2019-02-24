export const addUpload = (tour_id, visit_id, uniqueIdentifier) => ({
  type: 'ADD_UPLOAD',
  tour_id,
  visit_id,
  uniqueIdentifier
})

export const removeUpload = (uniqueIdentifier) => ({
  type: 'REMOVE_UPLOAD',
  uniqueIdentifier
})

export const saveUpload = (uniqueIdentifier, tour_id, visit_id, asset_id) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `${process.env.API_HOST}/api/tours/${tour_id}/visits/${visit_id}/photos`,
  meta: { uniqueIdentifier },
  body: { asset_id },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const updateProgress = (progress) => ({
  type: 'UPDATE_PROGRESS',
  progress
})
