export const INITIAL_STATE = {
  first_name: '',
  last_name: '',
  email: '',
  photo: null,
  agreed_to_terms: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      ...action.result.data
    }

  case 'TYPE':
    return {
      ...state,
      [action.key]: action.value
    }

  case 'AGREE':
    return {
      ...state,
      agreed_to_terms: action.agreed_to_terms
    }

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
