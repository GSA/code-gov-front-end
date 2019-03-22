import { EXPAND_MOBILE_MENU_OPTION } from 'constants/actions'
import expandMobileMenuOption from 'actions/expand-mobile-menu-option'

describe('actions - expand-mobile-menu-option', () => {
  it('should return an object containing the `EXPAND_MOBILE_MENU_OPTION` type', () => {
    expect(expandMobileMenuOption().type).toBe(EXPAND_MOBILE_MENU_OPTION)
  })

  it('should set the first param as `name`', () => {
    expect(expandMobileMenuOption('test-name').name).toBe('test-name')
  })
})