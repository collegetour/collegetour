const INITIAL_STATE = {
  status: 'pending',
  colleges: [],
  q: ''
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'success',
      colleges: action.result.data
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  default:
    return state
  }

}
