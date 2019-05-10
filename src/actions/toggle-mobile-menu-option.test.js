import { TOGGLE_MOBILE_MENU_OPTION } from 'constants/actions'
import toggleMobileMenuOption from 'actions/toggle-mobile-menu-option'

describe('actions - toggle-mobile-menu-option', () => {
  it('should return an object containing the `TOGGLE_MOBILE_MENU_OPTION` type', () => {
    expect(toggleMobileMenuOption().type).toBe(TOGGLE_MOBILE_MENU_OPTION)
  })

  it('should set the first param as `name`', () => {
    expect(toggleMobileMenuOption('test-name').name).toBe('test-name')
  })
})