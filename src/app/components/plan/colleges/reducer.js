const INITIAL_STATE = {
  mode: 'visit'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_MODE':
    return {
      ...state,
      mode: action.mode
    }

  case 'REORDER':
    return {
      ...state
    }

  default:
    return state
  }

}
