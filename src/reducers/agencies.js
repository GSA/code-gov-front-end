import { SAVE_AGENCIES } from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case SAVE_AGENCIES:
      return action.agencies
    default:
      return state
  }
}
