import { HIDE_SEARCH_DROPDOWN } from 'constants/actions'
import hideSearchDropdown from 'actions/hide-search-dropdown'

describe('actions - hide-search-dropdown', () => {
  it('should return an object containing the `HIDE_SEARCH_DROPDOWN` type', () => {
    expect(hideSearchDropdown().type).toBe(HIDE_SEARCH_DROPDOWN)
  })
})