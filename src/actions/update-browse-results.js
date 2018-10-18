import { UPDATE_BROWSE_RESULTS } from 'constants/actions';
import client from 'api'

export default function (filters) {
  return async dispatch => {
    const results = await client.repos(filters)
    console.error("results from client.repos with filters", filters, "is", results)
    results.filters = filters
    dispatch({ type: UPDATE_BROWSE_RESULTS, results })
  }
}