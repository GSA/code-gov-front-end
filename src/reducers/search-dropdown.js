import {
  HIDE_SEARCH_DROPDOWN,
  SHOW_SEARCH_DROPDOWN,
  TOGGLE_SEARCH_DROPDOWN
} from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case HIDE_SEARCH_DROPDOWN:
      return false
    case SHOW_SEARCH_DROPDOWN:
      return true
    case TOGGLE_SEARCH_DROPDOWN:
      return !state
    default:
      return state
  }
}
