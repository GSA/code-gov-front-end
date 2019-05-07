import React from 'react'
import { shallow } from 'enzyme'

import FilterTag from 'components/filter-tag/filter-tag.component'

const props = {
  category: 'c1',
  onClick: jest.fn(),
  title: 'test-title',
  value: 'test-value',
}

let wrapper
describe('components - FilterTag', () => {
  beforeEach(() => {
    wrapper = shallow(<FilterTag {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass the `category` and `value` to the `onClick` handler', () => {
    wrapper.simulate('click')
    expect(props.onClick).toBeCalledWith(props.category, props.value)
  })
})