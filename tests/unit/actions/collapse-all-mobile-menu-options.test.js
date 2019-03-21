import { COLLAPSE_ALL_MOBILE_MENU_OPTIONS } from 'constants/actions'
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options'

describe('actions - collapse-all-mobile-menu-options', () => {
  it('should return an object containing the `COLLAPSE_ALL_MOBILE_MENU_OPTIONS` type', () => {
    expect(collapseAllMobileMenuOptions().type).toBe(COLLAPSE_ALL_MOBILE_MENU_OPTIONS)
  })
})