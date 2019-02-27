const INITIAL_STATE = {
  status: 'pending',
  access: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_ACCESS_REQUEST':
    return {
      ...state,
      access: action.value,
      status: 'loading'
    }

  case 'LOAD_ACCESS_SUCCESS':
    return {
      ...state,
      access: action.value,
      status: 'loaded'
    }

  case 'SAVE_ACCESS_SUCCESS':
    return {
      ...state,
      access: action.value
    }

  default:
    return state
  }

}
