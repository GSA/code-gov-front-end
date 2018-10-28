import { LOAD_PROJECT } from 'constants/actions';
import client from 'api'

export default function (repoId) {
  return async dispatch => {
    const data = await client.getRepoById(repoId)
    dispatch({ type: LOAD_PROJECT, data })
  }
}
