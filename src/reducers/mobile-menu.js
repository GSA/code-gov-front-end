import { HIDE_MOBILE_MENU, SHOW_MOBILE_MENU, TOGGLE_MOBILE_MENU } from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case HIDE_MOBILE_MENU:
      return false
    case SHOW_MOBILE_MENU:
      return true
    case TOGGLE_MOBILE_MENU:
      return !state
    default:
      return state
  }
}
