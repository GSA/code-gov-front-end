import { UPDATE_SEARCH_FILTERS } from 'constants/actions'
import updateSearchFilters from 'actions/update-search-filters'

describe('actions - update-search-filters', () => {
  it('should return an object containing the `UPDATE_SEARCH_FILTERS` type', () => {
    expect(updateSearchFilters().type).toBe(UPDATE_SEARCH_FILTERS)
  })

  it('should return the first param as `category`', () => {
    expect(updateSearchFilters('category').category).toBe('category')
  })

  it('should return the second param as `value`', () => {
    expect(updateSearchFilters('category', 'value').value).toBe('value')
  })

  it('should return an `intent` of `add` if the thrid param is `checked`', () => {
    expect(updateSearchFilters('category', 'value', 'checked').intent).toBe('add')
  })

  it('should return an `intent` of `remove` if the thrid param is not `checked`', () => {
    expect(updateSearchFilters('category', 'value', 'not checked').intent).toBe('remove')
  })
})