const INITIAL_STATE = {
  status: 'pending',
  visits: [],
  mode: 'itinerary'
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

  case 'CHANGE_MODE':
    return {
      ...state,
      mode: action.mode
    }

  default:
    return state
  }

}
