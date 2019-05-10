import { CLEAR_SEARCH_RESULTS } from 'constants/actions'
import clearSearchResults from 'actions/clear-search-results'

describe('actions - clear-search-results', () => {
  it('should return an object containing the `CLEAR_SEARCH_RESULTS` type', () => {
    expect(clearSearchResults().type).toBe(CLEAR_SEARCH_RESULTS)
  })
})