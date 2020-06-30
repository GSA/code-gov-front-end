import React from 'react'
import { shallow } from 'enzyme'

import NavSelect from 'components/nav-select/nav-select.component'

const props = {
  handleChange: jest.fn(),
  pathname: '/page-2',
  pages: [
    { route: '/page-1', display: 'page 1' },
    { route: '/page-2', display: 'page 2' }
  ]
}

let wrapper
let instance
describe('components - NavSelect', () => {
  beforeEach(() => {
    wrapper = shallow(<NavSelect {...props} />)
    instance = wrapper.instance()
  })

  describe('handleChange', () => {
    it('should call `handleChange` with the value', () => {
      instance.handleChange({ target: { value: 'test-value' } })
      expect(props.handleChange).toBeCalledWith('test-value')
    })

    it('should not throw if `handleChange` not provided', () => {
      wrapper.setProps({ handleChange: undefined })
      expect(() => instance.handleChange({ target: { value: 'test-value' } })).not.toThrow()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should get the current page based off the `pathname`', () => {
      expect(wrapper.find('select').prop('value')).toEqual('/page-2')
    })

    it('should map the `pages` as options', () => {
      expect(wrapper.find('option').length).toBe(props.pages.length)
      expect(
        wrapper
          .find('option')
          .at(0)
          .text()
      ).toBe(props.pages[0].display)
    })
  })
})
