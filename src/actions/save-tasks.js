import { SAVE_TASKS } from 'constants/actions';
import client from 'api'

export default function () {
  return async dispatch => {
    const tasks = await client.tasks()
    console.log("tasks from client:", tasks)
    dispatch({ type: SAVE_TASKS, tasks })
  }
}
