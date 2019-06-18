import { UPDATE_REPO_ID } from 'constants/actions'

export default function(repoID) {
  return { type: UPDATE_REPO_ID, repoID }
}
