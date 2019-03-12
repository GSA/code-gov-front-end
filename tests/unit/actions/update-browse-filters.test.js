import { UPDATE_BROWSE_FILTERS } from 'constants/actions'
import updateBrowseFilters from 'actions/update-browse-filters'

describe('actions - update-browse-filters', () => {
  it('should return an object containing the `UPDATE_BROWSE_FILTERS` type', () => {
    expect(updateBrowseFilters().type).toBe(UPDATE_BROWSE_FILTERS)
  })

  it('should return the first param as `category`', () => {
    expect(updateBrowseFilters('category').category).toBe('category')
  })

  it('should return the second param as `value`', () => {
    expect(updateBrowseFilters('category', 'value').value).toBe('value')
  })

  it('should return an `intent` of `add` if the thrid param is `checked`', () => {
    expect(updateBrowseFilters('category', 'value', 'checked').intent).toBe('add')
  })

  it('should return an `intent` of `remove` if the thrid param is not `checked`', () => {
    expect(updateBrowseFilters('category', 'value', 'not checked').intent).toBe('remove')
  })
})