import pick from 'lodash.pick'

import client from 'api-client'
import { UPDATE_BROWSE_RESULTS } from 'constants/actions'
import updateBrowseResults from 'actions/update-browse-results'

const options = {
  size: 123,
  sort: 'best_match',
  page: 2,
  filters: [
    { category: 'agencies', value: 'ag-1' },
    { category: 'agencies', value: 'ag-2' },
    { category: 'languages', value: 'la-1' }
  ]
}
const results = {
  repos: [{ repoID: 'repo-1' }, { repoID: 'repo-2' }]
}
const dispatch = jest.fn()

describe('actions - update-browse-results', () => {
  beforeEach(() => {
    client.repos.mockResolvedValue(results)
  })

  it('should return a function (thunk)', () => {
    expect(typeof updateBrowseResults(options)).toBe('function')
  })

  it('should dispatch an object containing the `UPDATE_BROWSE_RESULTS` type', async () => {
    await updateBrowseResults(options)(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: UPDATE_BROWSE_RESULTS }))
  })

  it('should return the `results` retrieved', async () => {
    await updateBrowseResults(options)(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ results }))
  })

  it('should pass the options to the api call for repos', async () => {
    const expected = {
      ...pick(options, ['size', 'sort', 'page']),
      agencies: ['ag-1', 'ag-2'],
      languages: ['la-1'],
      licenses: [],
      usageTypes: []
    }

    await updateBrowseResults(options)(dispatch)
    expect(client.repos).toBeCalledWith(expected)
  })

  it('should call the api with default options if none provided', async () => {
    await updateBrowseResults({})(dispatch)
    expect(client.repos).toBeCalledWith({})
  })
})
