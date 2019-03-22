import { HIDE_MOBILE_MENU } from 'constants/actions'
import hideMobileMenu from 'actions/hide-mobile-menu'

describe('actions - hide-mobile-menu', () => {
  it('should return an object containing the `HIDE_MOBILE_MENU` type', () => {
    expect(hideMobileMenu().type).toBe(HIDE_MOBILE_MENU)
  })
})