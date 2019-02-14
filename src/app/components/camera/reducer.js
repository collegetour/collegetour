const INITIAL_STATE = {
  preview: false,
  upload: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_UPLOAD':
    return {
      ...state,
      preview: true,
      upload: {
        ...action.file,
        status: 'added',
        progress: 0,
        asset: null
      }
    }

  case 'REMOVE_UPLOAD':
    return {
      ...state,
      preview: false
    }

  default:
    return state
  }

}
