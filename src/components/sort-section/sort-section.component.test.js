import React from 'react'
import { shallow } from 'enzyme'

import SortSection from 'components/sort-section/sort-section.component'

const props = {
  onSortChange: jest.fn(),
  options: [
    { value: 'opt-1', label: 'label-1', selected: false },
    { value: 'opt-2', label: 'label-2', selected: true },
  ]
}

let wrapper
let instance
describe('components - SortSection', () => {
  beforeEach(() => {
    wrapper = shallow(<SortSection {...props} />)
    instance = wrapper.instance()
  })

  describe('onSortChange', () => {
    it('should call `onSortChange` with the value', () => {
      instance.onSortChange({ target: { value: 'test-value' } })
      expect(props.onSortChange).toBeCalledWith('test-value')
    })

    it('should not throw if `onSortChange` not provided', () => {
      wrapper.setProps({ onSortChange: undefined })
      expect(() => instance.onSortChange({ target: { value: 'test-value' } })).not.toThrow()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render all the options', () => {
      expect(wrapper.find('option').length).toBe(props.options.length)
    })
  })
})