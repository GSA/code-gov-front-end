import { UPDATE_BROWSE_RESULTS } from 'constants/actions';
import client from 'api'

export default function (params) {
  return async dispatch => {
    const results = await client.repos(params)
    console.error("results from client.repos with filters", params, "is", results.repos.length)
    results.params = params
    dispatch({ type: UPDATE_BROWSE_RESULTS, results })
  }
}