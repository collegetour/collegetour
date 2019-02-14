const INITIAL_STATE = {
  step: 1
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_STEP':
    return {
      ...state,
      step: action.step
    }

  default:
    return state
  }

}
