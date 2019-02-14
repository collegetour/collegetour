export const INITIAL_STATE = {
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

  default:
    return state
  }

}

export default reducer
