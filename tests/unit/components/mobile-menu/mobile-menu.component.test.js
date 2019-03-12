import React from 'react'
import { shallow } from 'enzyme'

import MobileMenu from 'components/mobile-menu/mobile-menu.component'

const props = {
  open: false,
  menu: [
    { name: 'menu-opt-1', expanded: false, links: [{ id: 'menu-link-1' }] },
    { name: 'menu-opt-2', expanded: true , links: [{ id: 'menu-link-2' }]},
  ],
  onSelect: jest.fn(),
}

let wrapper
let instance
describe('components - MobileMenu', () => {
  beforeEach(() => {
    wrapper = shallow(<MobileMenu {...props} />)
    instance = wrapper.instance()
  })

  describe('underlay', () => {
    it('should render', () => {
      expect(shallow(instance.underlay).html()).not.toBeFalsy()
    })

    it('should attach an `active` class if open', () => {
      wrapper.setProps({ open: true })
      expect(shallow(instance.underlay).prop('className')).toMatch(/active/)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should attach an `open` class to if open', () => {
      wrapper.setProps({ open: true })
      expect(wrapper.find('.mobile-menu').prop('className')).toMatch(/open/)
    })
  })
})