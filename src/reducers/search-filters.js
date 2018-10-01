import { CLEAR_SEARCH_FILTERS, UPDATE_SEARCH_FILTERS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_SEARCH_FILTERS:
      return null
    case UPDATE_SEARCH_FILTERS:
      console.log("STARTING UPDATE_SEARCH_FILTERS with:", state, action)
      const { category, values } = action;
      console.log("category and values", category, values);
      const newState = state || {}
      newState[category] = values
      return newState
    default:
      return state;
  }
}