import { UPDATE_SEARCH_FILTERS } from 'constants/actions'

export default function(category, value, change) {
  const intent = change === 'checked' ? 'add' : 'remove'
  return { type: UPDATE_SEARCH_FILTERS, category, value, intent }
}
