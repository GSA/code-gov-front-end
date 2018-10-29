import { CLEAR_TASK_RESULTS, UPDATE_TASK_RESULTS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_TASK_RESULTS:
      return null
    case UPDATE_TASK_RESULTS:
      return action.results
    default:
      return state;
  }
}