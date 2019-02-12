const INITIAL_STATE = {
  error: null,
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SIGNIN_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case 'SIGNIN_FAILURE':
    return {
      ...state,
      status: 'failure',
      error: action.meta.error
    }

  case 'SIGNIN_SUCCESS':
    return {
      ...state,
      error: null,
      status: 'success'
    }

  default:
    return state
  }

}
