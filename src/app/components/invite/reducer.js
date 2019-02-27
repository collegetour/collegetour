const INITIAL_STATE = {
  access: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_ACCESS':
    return {
      ...state,
      access: action.access
    }

  default:
    return state
  }

}
