import { TOGGLE_SEARCH_DROPDOWN } from 'constants/actions'
import toggleSearchDropdown from 'actions/toggle-search-dropdown'

describe('actions - toggle-search-dropdown', () => {
  it('should return an object containing the `TOGGLE_SEARCH_DROPDOWN` type', () => {
    expect(toggleSearchDropdown().type).toBe(TOGGLE_SEARCH_DROPDOWN)
  })
})