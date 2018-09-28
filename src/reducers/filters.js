import { SAVE_FILTER_DATA } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case SAVE_FILTER_DATA:
      return action.data;
    default:
      return state;
  }
}