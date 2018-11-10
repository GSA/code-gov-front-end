/* global fetch */
import { SAVE_TASK_FILTER_OPTIONS } from 'constants/actions';

export default function () {
  return async dispatch => {
    const url = "https://raw.githubusercontent.com/GSA/code-gov-data/master/filters/tasks.json"
    const response = await fetch(url)
    const options = await response.json()
    dispatch({ type: SAVE_TASK_FILTER_OPTIONS, options })
  }
}
