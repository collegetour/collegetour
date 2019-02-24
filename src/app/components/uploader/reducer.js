export const INITIAL_STATE = {
  uploads: [],
  progress: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_UPLOAD':
    return {
      ...state,
      uploads: [
        ...state.uploads,
        {
          tour_id: action.tour_id,
          visit_id: action.visit_id,
          uniqueIdentifier: action.uniqueIdentifier
        }
      ]
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      uploads: [
        ...state.uploads.filter(upload => {
          return upload.uniqueIdentifier !== action.uniqueIdentifier
        })
      ]
    }

  case 'UPDATE_PROGRESS':
    return {
      ...state,
      progress: action.progress
    }

  default:
    return state

  }

}

export default reducer
