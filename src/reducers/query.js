import { CLEAR_QUERY, UPDATE_QUERY } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_QUERY:
      return null;
    case UPDATE_QUERY:
      console.error('hit UPDATE_QUERY')
      return action.query
    default:
      return state;
  }
}