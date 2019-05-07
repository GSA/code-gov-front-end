import { TOGGLE_MOBILE_MENU } from 'constants/actions'
import toggleMobileMenu from 'actions/toggle-mobile-menu'

describe('actions - toggle-mobile-menu', () => {
  it('should return an object containing the `TOGGLE_MOBILE_MENU` type', () => {
    expect(toggleMobileMenu().type).toBe(TOGGLE_MOBILE_MENU)
  })
})