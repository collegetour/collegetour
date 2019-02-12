const INITIAL_STATE = {
  mode: 'visits',
  status: 'pending',
  step: 1
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
      visits: action.result.data
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'CHANGE_STEP':
    return {
      ...state,
      step: action.step
    }

  default:
    return state
  }

}
