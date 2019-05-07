import { UPDATE_REPO_ID } from 'constants/actions'
import updateRepoID from 'actions/update-repo-id'

describe('actions - update-repo-id', () => {
  it('should return an object containing the `UPDATE_REPO_ID` type', () => {
    expect(updateRepoID().type).toBe(UPDATE_REPO_ID)
  })

  it('should set the first param as `repoID`', () => {
    expect(updateRepoID('repo-id').repoID).toBe('repo-id')
  })
})