import { OPEN_REPO } from 'constants/actions'

export default function(repo) {
  return { type: OPEN_REPO, repo }
}
