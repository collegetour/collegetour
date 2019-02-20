const INITIAL_STATE = {
  data: {},
  errors: {},
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      data: action.result.data
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saved'
    }

  case 'UPDATE_DATA':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      }
    }

  default:
    return state
  }

}
