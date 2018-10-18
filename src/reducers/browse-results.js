import { CLEAR_BROWSE_RESULTS, UPDATE_BROWSE_RESULTS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_BROWSE_RESULTS:
      return null
    case UPDATE_BROWSE_RESULTS:
      return action.results
    default:
      return state;
  }
}