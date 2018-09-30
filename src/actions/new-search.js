import { NEW_SEARCH } from 'constants/actions';
import client from 'api'

export default function (query) {
  return async dispatch => {
    const results = await client.search(query)
    results.filters = {
      query: query
    }
    dispatch({ type: NEW_SEARCH, results })
  }
}