const INITIAL_STATE = {
  contacts: [],
  status: 'pending',
  tourists: []
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
      tourists: action.result.data.map(tourist => tourist.user)
    }

  case 'SET_CONTACTS':
    return {
      ...state,
      contacts: action.contacts
    }

  case 'INVITE_SUCCESS':
    return {
      ...state,
      tourists: [
        ...state.tourists,
        action.result.data
      ]
    }

  default:
    return state
  }

}
