const INITIAL_STATE = {
  preview: false,
  upload: null,
  caption: ''
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

  case 'UPDATE_UPLOAD':
    return {
      ...state,
      upload: {
        ...state.upload,
        asset: action.asset
      }
    }

  case 'TYPE':
    return {
      ...state,
      caption: action.caption
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      preview: false
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      upload: null
    }

  default:
    return state
  }

}
