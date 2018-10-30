import { CLEAR_BROWSE_PARAMS, UPDATE_BROWSE_PARAMS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_BROWSE_PARAMS:
      return null
    case UPDATE_BROWSE_PARAMS:
      const { category, value } = action;
      const newState = state || {}
      newState[category] = value
      return newState
    default:
      return state;
  }
}