import { UPDATE_AGENCIES_RESULTS } from 'constants/actions'
import { getFilterValuesFromParamsByCategory } from 'utils/other'

export default function(params) {
  return async dispatch => {
    const options = {}
    if (params.size) options.size = params.size
    if (params.sort) options.sort = params.sort
    if (params.page) options.page = params.page
    if (params.filters) {
      // ['agencies', 'languages', 'licenses', 'usageTypes'].forEach(key => {
      //  options[key] = getFilterValuesFromParamsByCategory(params, key)
      // })
      ;['agencies'].forEach(key => {
        options[key] = getFilterValuesFromParamsByCategory(params, key)
      })
    }
    // const nresults = await client.repos(options)
    // results.params = options
    // dispatch({ type: UPDATE_BROWSE_RESULTS, results })
    const results = {}
    results.params = options
    dispatch({ type: UPDATE_AGENCIES_RESULTS, results })
  }
}
