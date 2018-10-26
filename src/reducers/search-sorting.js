import { UPDATE_SEARCH_SORTING } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case UPDATE_SEARCH_SORTING:
      return action.value
    default:
      return state;
  }
}