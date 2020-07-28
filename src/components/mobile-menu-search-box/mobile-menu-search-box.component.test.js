import React from 'react'
import { shallow } from 'enzyme'

import MobileMenuSearchBox from 'components/mobile-menu-search-box/mobile-menu-search-box.component'

const props = {
  onSubmit: jest.fn(),
  toggleMobileMenu: jest.fn(),
  mobileMenu: true
}

let wrapper
let instance
describe('components - MobileMenuSearchBox', () => {
  beforeEach(() => {
    wrapper = shallow(<MobileMenuSearchBox {...props} />)
    instance = wrapper.instance()
  })

  describe('handleChange', () => {
    beforeEach(() => {
      instance.handleChange({ target: { value: 'test-value' } })
    })

    it('should set the value', () => {
      expect(wrapper.state('value')).toBe('test-value')
    })
  })

  describe('handleSubmit', () => {
    beforeEach(() => {
      wrapper.setState({ value: 'test-value' })
      instance.handleSubmit({ preventDefault: jest.fn() })
    })

    it('should call `onSubmit` with the value', () => {
      expect(props.onSubmit).toBeCalledWith('test-value')
    })

    it('should clear the value', () => {
      expect(wrapper.state('value')).toBe('')
    })

    it('should call `toggleMobileMenu` with props.mobileMenu', () => {
      expect(props.toggleMobileMenu).toBeCalledWith(props.mobileMenu)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
