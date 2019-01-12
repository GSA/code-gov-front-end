import { UPDATE_SEARCH_PARAMS } from 'constants/actions'

export default function(data) {
  return { type: UPDATE_SEARCH_PARAMS, data }
}
