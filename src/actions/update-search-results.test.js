import client from 'api-client'
import { CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS } from 'constants/actions'
import updateSearchResults from 'actions/update-search-results'

const filters = {
  query: 'test-query'
}
const results = {
  repos: [{ repoID: 'repo-1' }, { repoID: 'repo-2' }]
}
const dispatch = jest.fn()

describe('actions - update-search-results', () => {
  beforeEach(() => {
    client.search.mockResolvedValue(results)
  })

  it('should return a function (thunk)', () => {
    expect(typeof updateSearchResults(filters)).toBe('function')
  })

  it('should dispatch an object containing the `UPDATE_SEARCH_RESULTS` type if a `query` is provided', async () => {
    await updateSearchResults(filters)(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: UPDATE_SEARCH_RESULTS }))
  })

  it('should return the `results` retrieved if a `query` is provided', async () => {
    await updateSearchResults(filters)(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ results }))
  })

  it('should pass the `query` to the api call if provided', async () => {
    await updateSearchResults(filters)(dispatch)
    expect(client.search).toBeCalledWith(filters.query)
  })

  it('should dispatch an object containing the `CLEAR_SEARCH_RESULTS` type if no `query` is provided', async () => {
    await updateSearchResults({})(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: CLEAR_SEARCH_RESULTS }))
  })
})
