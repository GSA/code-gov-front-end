import { UPDATE_TASK_RESULTS } from 'constants/actions'
import { getFilterValuesFromParamsByCategory } from 'utils/other'
import client from 'api-client'

export default function(params) {
  return async dispatch => {
    const options = {}
    if (params.size) options.size = params.size
    if (params.page) options.page = params.page
    if (params.filters) {
      ;['agencies', 'categories', 'languages', 'skillLevels', 'timeRequired'].forEach(key => {
        options[key] = getFilterValuesFromParamsByCategory(params, key)
      })
    }

    const results = await client.tasks(options)
    results.params = params
    dispatch({ type: UPDATE_TASK_RESULTS, results })
  }
}
