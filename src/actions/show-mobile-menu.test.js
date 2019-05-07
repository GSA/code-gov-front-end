import { SHOW_MOBILE_MENU } from 'constants/actions'
import showMobileMenu from 'actions/show-mobile-menu'

describe('actions - show-mobile-menu', () => {
  it('should return an object containing the `SHOW_MOBILE_MENU` type', () => {
    expect(showMobileMenu().type).toBe(SHOW_MOBILE_MENU)
  })
})