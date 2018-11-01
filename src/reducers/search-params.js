import { CLEAR_SEARCH_PARAMS, UPDATE_SEARCH_PARAMS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_SEARCH_PARAMS:
      return null
    case UPDATE_SEARCH_PARAMS:
      const { category, value } = action;
      const newState = state || {}
      newState[category] = value
      return newState
    default:
      return state;
  }
}