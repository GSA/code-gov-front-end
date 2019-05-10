import { COLLAPSE_MOBILE_MENU_OPTION } from 'constants/actions'
import collapseMobileMenuOption from 'actions/collapse-mobile-menu-option'

describe('actions - collapse-mobile-menu-option', () => {
  it('should return an object containing the `COLLAPSE_MOBILE_MENU_OPTION` type', () => {
    expect(collapseMobileMenuOption().type).toBe(COLLAPSE_MOBILE_MENU_OPTION)
  })

  it('should set the first param as `name`', () => {
    expect(collapseMobileMenuOption('test-name').name).toBe('test-name')
  })
})