import { CLEAR_BROWSE_FILTERS, UPDATE_BROWSE_FILTERS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_BROWSE_FILTERS:
      return null
    case UPDATE_BROWSE_FILTERS:
      console.log("STARTING UPDATE_BROWSE_FILTERS with:", state, action)
      const { category, values } = action;
      console.log("category and values", category, values);
      const newState = state || {}
      newState[category] = values
      return newState
    default:
      return state;
  }
}