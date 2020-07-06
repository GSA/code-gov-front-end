import React from 'react'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash.clonedeep'

import { eventMap as wEventMap } from 'mocks/window'
import { eventMap as dEventMap } from 'mocks/document'
import Menu from 'components/menu/menu.component'

const props = {
  color: 'white',
  onHomePage: false,
  siteTitle: 'test-title',
  toggleSearchDropdown: jest.fn(),
  logoDark: 'logo-src-dark',
  logoLight: 'logo-src-light',
  menu: [
    { name: 'menu-opt-1', expanded: false, links: [{ id: 'menu-link-1' }] },
    { name: 'menu-opt-2', expanded: true, links: [{ id: 'menu-link-2' }] }
  ]
}

let wrapper
let instance
describe('components - Menu', () => {
  beforeEach(() => {
    // props gets mutated, make deep copy
    wrapper = shallow(<Menu {...cloneDeep(props)} />)
    instance = wrapper.instance()
  })

  describe('onToggleMenuOption', () => {
    it('should inverse (mutation) the passed option`s `expanded` property', () => {
      const option = { name: 'menu-opt-1', expanded: true, links: [{ id: 'link' }] }
      wrapper.setState({ menu: props.menu })

      // true => false
      instance.onToggleMenuOption(option)
      expect(option.expanded).toBeFalsy()

      // false => true
      instance.onToggleMenuOption(option)
      expect(option.expanded).toBeTruthy()
    })

    xit('should set `expanded` based off if any options are expanded', () => {
      // BUG: not set based off current option being expanded, based off outdated state
      // Remove (all references to expanded in state)? - doesnt look like even needed / adding `expanded` class to nav does nothing
    })
  })

  describe('onToggleMobileMenu', () => {
    it('should inverse the value of the current mobileMenu state', () => {
      wrapper.setState({ mobileMenu: true })

      // true => false
      instance.onToggleMobileMenu()
      expect(wrapper.state('mobileMenu')).toBeFalsy()

      // false => true
      instance.onToggleMobileMenu()
      expect(wrapper.state('mobileMenu')).toBeTruthy()
    })
  })

  xdescribe('expanded', () => {
    // Refactor? - not used anywhere - looks like should be used in onClickMenuOption
  })

  xdescribe('menus', () => {
    // Refactor? - not used anywhere - looks like should be used in place of `menubar` items
  })

  describe('collapse', () => {
    it('should set the menu`s options as not being expanded', () => {
      wrapper.setState({ menu: [{ expanded: true }, { expanded: true }] })
      instance.collapse()
      expect(wrapper.state('menu').every(x => !x.expanded)).toBeTruthy()
    })

    it('should set mobileMenu to false', () => {
      wrapper.setState({ mobileMenu: true })
      instance.collapse()
      expect(wrapper.state('mobileMenu')).toBeFalsy()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
