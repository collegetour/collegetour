export const INITIAL_STATE = {
  tourists: [],
  first_name: '',
  last_name: '',
  email: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TYPE':
    return {
      ...state,
      [action.key]: action.value
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      tourists: action.result.data
    }

  default:
    return state
  }

}

export default reducer
