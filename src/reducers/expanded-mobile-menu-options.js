import {
  COLLAPSE_ALL_MOBILE_MENU_OPTIONS,
  COLLAPSE_MOBILE_MENU_OPTION,
  EXPAND_MOBILE_MENU_OPTION,
  TOGGLE_MOBILE_MENU_OPTION
} from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case COLLAPSE_ALL_MOBILE_MENU_OPTIONS:
      return []
    case EXPAND_MOBILE_MENU_OPTION:
      // there can only be one option expanded at once
      return [action.name]
    case COLLAPSE_MOBILE_MENU_OPTION:
      return [].filter(name => name !== action.name)
    case TOGGLE_MOBILE_MENU_OPTION:
      if (state.includes(action.name)) {
        return []
      }
      // there can only be one option expanded at once
      return [action.name]

    default:
      return state
  }
}
