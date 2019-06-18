import { UPDATE_SEARCH_FILTER_TAGS } from 'constants/actions'

export default function(tags) {
  return { type: UPDATE_SEARCH_FILTER_TAGS, tags }
}
