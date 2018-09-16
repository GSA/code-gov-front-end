import { CLEAR_AGENCIES, SAVE_AGENCIES } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_AGENCIES:
      return null;
    case SAVE_AGENCIES:
      return action.agencies;
    default:
      return state;
  }
}