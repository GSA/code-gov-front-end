import React from 'react'
import { shallow } from 'enzyme'

import FilterTags from 'components/filter-tags/filter-tags.component'

const props = {
  filters: [
    { category: 'c1', title: 't1', value: 'v1' },
    { category: 'c2', title: 't2', value: 'v2' },
  ],
  onClick: jest.fn(),
}

let wrapper
describe('components - FilterTags', () => {
  beforeEach(() => {
    wrapper = shallow(<FilterTags {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the filters out', () => {
    expect(wrapper.findWhere(x => x.prop('value')).length).toBe(props.filters.length)
  })
})