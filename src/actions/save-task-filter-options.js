import { SAVE_TASK_FILTER_OPTIONS } from 'constants/actions'
import { getJSON } from 'utils/other'

export default function() {
  return async dispatch => {
    const url = `${PUBLIC_PATH}assets/data/filters/tasks.json`
    const options = await getJSON(url)
    dispatch({ type: SAVE_TASK_FILTER_OPTIONS, options })
  }
}
