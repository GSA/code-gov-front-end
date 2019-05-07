import { UPDATE_SEARCH_PARAMS } from 'constants/actions'
import updateSearchParams from 'actions/update-search-params'

describe('actions - update-search-params', () => {
  it('should return an object containing the `UPDATE_SEARCH_PARAMS` type', () => {
    expect(updateSearchParams().type).toBe(UPDATE_SEARCH_PARAMS)
  })

  it('should set the first param as `data`', () => {
    expect(updateSearchParams('test-param').data).toBe('test-param')
  })
})