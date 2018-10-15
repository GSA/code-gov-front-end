import { CLEAR_TASKS, SAVE_TASKS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_TASKS:
      return null;
    case SAVE_TASKS:
      return action.tasks;
    default:
      return state;
  }
}
