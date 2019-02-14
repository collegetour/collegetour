const INITIAL_STATE = {
  mode: 'visit',
  status: 'pending',
  visits: []
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

  case 'ADD_VISIT':
    return {
      ...state,
      visits: [
        ...state.visits,
        action.visit
      ]
    }

  case 'REORDER':
    return {
      ...state,
      visits: (action.from < action.to) ? [
        ...state.visits.slice(0, action.from),
        ...state.visits.slice(action.from + 1, action.to + 1),
        state.visits[action.from],
        ...state.visits.slice(action.to + 1)
      ] : [
        ...state.visits.slice(0, action.to),
        state.visits[action.from],
        ...state.visits.slice(action.to, action.from),
        ...state.visits.slice(action.from + 1)
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      visits: [
        ...state.visits.filter((visit, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}
