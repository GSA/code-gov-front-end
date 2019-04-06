import { SHOW_SEARCH_DROPDOWN } from 'constants/actions'
import showSearchDropdown from 'actions/show-search-dropdown'

describe('actions - show-search-dropdown', () => {
  it('should return an object containing the `SHOW_SEARCH_DROPDOWN` type', () => {
    expect(showSearchDropdown().type).toBe(SHOW_SEARCH_DROPDOWN)
  })
})