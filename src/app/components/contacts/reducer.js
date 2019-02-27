const INITIAL_STATE = {
  contacts: [
    { first_name: 'Greg', last_name: 'Kops', email: 'greg@thinktopography.com' },
    { first_name: 'Greg', last_name: 'Kops', email: 'mochini@gmail.com' },
    { first_name: 'Greg', last_name: 'Kops', email: 'mochini+1@gmail.com' },
    { first_name: 'Greg', last_name: 'Kops', email: 'mochini+2@gmail.com' },
    { first_name: 'Greg', last_name: 'Kops', email: 'mochini+3@gmail.com' },
    { first_name: 'Greg', last_name: 'Kops', email: 'mochini+4@gmail.com' },
    { first_name: 'Greg', last_name: 'Kops', email: 'mochini+5@gmail.com' }
  ],
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
