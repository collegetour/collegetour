const INITIAL_STATE = {
  uploads: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_UPLOAD':
    return {
      ...state,
      uploads: [
        ...state.uploads,
        {
          ...action.file,
          status: 'added',
          progress: 0,
          asset: null,
          caption: ''
        }
      ]
    }

  case 'REMOVE_UPLOADS':
    return {
      ...state,
      uploads: []
    }

  case 'UPDATE_UPLOAD':
    return {
      ...state,
      uploads: [
        ...state.uploads.map((upload, index) => {
          if(upload.identifier !== action.asset.identifier) return upload
          return {
            ...upload,
            asset: action.asset
          }
        })
      ]
    }

  case 'TYPE':
    return {
      ...state,
      uploads: [
        ...state.uploads.map((upload, index) => {
          if(index !== action.index) return upload
          return {
            ...upload,
            caption: action.caption
          }
        })
      ]
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      uploads: null
    }

  default:
    return state
  }

}
