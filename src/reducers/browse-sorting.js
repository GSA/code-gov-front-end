import { UPDATE_BROWSE_SORTING } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case UPDATE_BROWSE_SORTING:
      return action.value
    default:
      return state;
  }
}