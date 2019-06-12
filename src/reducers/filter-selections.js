import { SAVE_FILTER_SELECTIONS } from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case SAVE_FILTER_SELECTIONS:
      return action.selections
    default:
      return state
  }
}
