import { OPEN_REPO } from 'constants/actions'
import openRepo from 'actions/open-repo'

describe('actions - open-repo', () => {
  it('should return an object containing the `OPEN_REPO` type', () => {
    expect(openRepo().type).toBe(OPEN_REPO)
  })

  it('should set the first param as `repo`', () => {
    expect(openRepo('test-repo').repo).toBe('test-repo')
  })
})