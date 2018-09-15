import { CLEAR_REPO, OPEN_REPO } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_REPO:
      return null;
    case OPEN_REPO:
      return action.repo;
    default:
      return state;
  }
}