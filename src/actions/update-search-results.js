import { CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS } from 'constants/actions'
import client from 'api-client'

export default function(filters) {
  return async dispatch => {
    const query = filters.query
    if (query) {
      // we're filtering client size, so we don't need most filters
      const results = await client.search(query)
      results.filters = filters
      dispatch({ type: UPDATE_SEARCH_RESULTS, results })
    } else {
      dispatch({ type: CLEAR_SEARCH_RESULTS })
    }
  }
}
