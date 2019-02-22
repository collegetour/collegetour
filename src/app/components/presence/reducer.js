const INITIAL_STATE = {
  status: 'pending',
  token: null,
  tourist_id: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_TOURIST_SUCCESS':
    return {
      ...state,
      tourist_id: action.value
    }

  case 'REMOVE_TOURIST_SUCCESS':
    return {
      ...state,
      tourist_id: null
    }

  case 'LOAD_TOKEN_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_TOKEN_SUCCESS':
    return {
      ...state,
      token: action.value,
      status: 'loaded'
    }

  case 'LOAD_TOKEN_FAILURE':
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
      ...action.result.data,
      status: 'saved'
    }

  case 'LOAD_SESSION_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'SET_TOKEN':
    return {
      ...state,
      token: action.token,
      status: 'loaded'
    }

  case 'SET_TOURIST':
    return {
      ...state,
      tourist_id: action.tourist_id
    }

  case 'SIGNOUT':
    return {
      ...state,
      status: 'loaded',
      token: null,
      tourist_id: null,
      user: null
    }

  default:
    return state
  }

}
