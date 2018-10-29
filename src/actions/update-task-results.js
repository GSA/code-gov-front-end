import { UPDATE_TASK_RESULTS } from 'constants/actions';
import client from 'api'

export default function (params) {
  return async dispatch => {
    const results = await client.tasks(params)
    console.error("results from client.tasks with filters", params, "is", results.total)
    results.params = params
    dispatch({ type: UPDATE_TASK_RESULTS, results })
  }
}