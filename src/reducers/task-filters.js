import { CLEAR_TASK_FILTERS, UPDATE_TASK_FILTERS } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_TASK_FILTERS:
      return null
    case UPDATE_TASK_FILTERS:
      console.log("STARTING UPDATE_TASK_FILTERS with:", state, action)
      const { category, values } = action;
      console.log("category and values", category, values);
      const newState = state || {}
      newState[category] = values
      return newState
    default:
      return state;
  }
}
