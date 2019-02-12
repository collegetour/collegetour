const INITIAL_STATE = {
  status: 'presence',
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_USER_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_USER_SUCCESS':
    return {
      ...state,
      user: action.value,
      status: 'loaded'
    }

  case 'LOAD_USER_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}
