import { LOAD_PROJECT } from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case LOAD_PROJECT:
      return action.data
    default:
      return state
  }
}
