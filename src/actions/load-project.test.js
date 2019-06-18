import client from 'api-client'
import { LOAD_PROJECT } from 'constants/actions'
import loadProject from 'actions/load-project'

const repo = { repoID: '123' }
const dispatch = jest.fn()

describe('actions - load-project', () => {
  beforeEach(() => {
    client.getRepoById.mockResolvedValue(repo)
  })

  it('should return a function (thunk)', () => {
    expect(typeof loadProject('repo-id')).toBe('function')
  })

  it('should dispatch an object containing the `LOAD_PROJECT` type', async () => {
    await loadProject('repo-id')(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: LOAD_PROJECT }))
  })

  it('should return the `data` retrieved', async () => {
    await loadProject('repo-id')(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ data: repo }))
  })
})
