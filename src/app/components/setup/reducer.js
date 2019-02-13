export const INITIAL_STATE = {
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saved'
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}

export default reducer
