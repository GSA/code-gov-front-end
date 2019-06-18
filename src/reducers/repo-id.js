import { UPDATE_REPO_ID } from 'constants/actions'

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_REPO_ID:
      return action.repoID
    default:
      return state
  }
}
