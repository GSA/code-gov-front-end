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
    { name: 'menu-opt-2', expanded: true , links: [{ id: 'menu-link-2' }]},
  ],
}

let wrapper
let instance
describe('components - Menu', () => {
  beforeEach(() => {
    // props gets mutated, make deep copy
    wrapper = shallow(<Menu {...cloneDeep(props)} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should attach a `scroll` event listener that sets `notAtTop` when not at the top', () => {
      document.body.scrollTop = 100
      wEventMap.scroll()
      expect(wrapper.state('notAtTop')).toBeTruthy()
    })

    it('should attach a `click` event listener that collapses the header', () => {
      instance.collapse = jest.fn()
      // mock a ref, shallow render doesnt get refs :(
      instance.header = { current: { contains: jest.fn() } }

      // click outside header - collapses
      dEventMap.click({ target: 'div' })
      expect(instance.collapse).toBeCalled()

      // click inside header - not collapse
      jest.resetAllMocks()
      dEventMap.click({ target: instance.header.current })
      expect(instance.collapse).not.toBeCalled()
    })
  })

  describe('onClickMenuOption', () => {
    it('should inverse (mutation) the passed option`s `expanded` property', () => {
      const option = { expanded: true, links: [{ id: 'link' }] }
      // true => false
      instance.onClickMenuOption(option)
      expect(option.expanded).toBeFalsy()
      // false => true
      instance.onClickMenuOption(option)
      expect(option.expanded).toBeTruthy()
    })

    it('should set the `height` based off the number of links if expanded', () => {
      const option = { expanded: false, links: [{ id: 'link-1' }, { id: 'link-2' }] }
      instance.onClickMenuOption(option)
      expect(wrapper.state('height')).toBe(74 + 40 * 2)
    })

    it('should set the `height` as `auto` if not expanded', () => {
      const option = { expanded: true, links: [{ id: 'link-1' }] }
      instance.onClickMenuOption(option)
      expect(wrapper.state('height')).toBe('auto')
    })

    xit('should set `expanded` based off if any options are expanded', () => {
      // BUG: not set based off current option being expanded, based off outdated state
      // Remove (all references to expanded in state)? - doesnt look like even needed / adding `expanded` class to nav does nothing
    })
  })

  xdescribe('expanded', () => {
    // Refactor? - not used anywhere - looks like should be used in onClickMenuOption
  })

  xdescribe('menus', () => {
    // Refactor? - not used anywhere - looks like should be used in place of `menubar` items
  })

  describe('collapse', () => {
    it('should set the menu as not being expanded', () => {
      wrapper.setState({ expanded: true })
      instance.collapse()
      expect(wrapper.state('expanded')).toBeFalsy()
    })

    it('should set the menu`s options as not being expanded', () => {
      wrapper.setState({ menu: [{ expanded: true }, { expanded: true }] })
      instance.collapse()
      expect(wrapper.state('menu').every(x => !x.expanded)).toBeTruthy()
    })

    it('should change the `height` to `auto`', () => {
      wrapper.setState({ height: 100 })
      instance.collapse()
      expect(wrapper.state('height')).toBe('auto')
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})