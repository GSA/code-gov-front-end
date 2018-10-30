import { CLEAR_SEARCH_HISTORY, NEW_SEARCH } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_SEARCH_HISTORY:
      return null
    case NEW_SEARCH:
      return action.results
    default:
      return state;
  }
}