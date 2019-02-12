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

  case 'LOAD_SESSION_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'LOAD_SESSION_SUCCESS':
    return {
      ...state,
      user: action.result.data,
      status: 'saved'
    }

  case 'LOAD_SESSION_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}
