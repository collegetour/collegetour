export const loadAccess = () => ({
  type: 'LOCAL_GET',
  key: 'contact_access',
  request: 'LOAD_ACCESS_REQUEST',
  success: 'LOAD_ACCESS_SUCCESS',
  failure: 'LOAD_ACCESS_FAILURE'
})

export const saveAccess = (access) => ({
  type: 'LOCAL_SET',
  key: 'contact_access',
  value: access,
  request: 'SAVE_ACCESS_REQUEST',
  success: 'SAVE_ACCESS_SUCCESS',
  failure: 'SAVE_ACCESS_FAILURE'
})
