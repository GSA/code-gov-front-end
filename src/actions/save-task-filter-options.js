/* global PUBLIC_PATH */
import { SAVE_TASK_FILTER_OPTIONS } from 'constants/actions'
import { getJSON } from 'utils/other'

export default function() {
  return async dispatch => {
    const tasks = await getJSON(`${PUBLIC_PATH}assets/data/filters/tasks.json`)
    dispatch({ type: SAVE_TASK_FILTER_OPTIONS, options: tasks })
  }
}
