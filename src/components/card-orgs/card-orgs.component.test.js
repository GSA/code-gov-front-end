import React from 'react'
import { shallow } from 'enzyme'

import CardPart from 'components/card-part/card-part.component'

const props = {
  title: 'test-title',
  text: 'test-text'
}

let wrapper
describe('components - CardPart', () => {
  beforeEach(() => {
    wrapper = shallow(<CardPart {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render default text if none provided', () => {
    wrapper.setProps({ text: undefined })
    expect(wrapper.find('span').text()).toMatch(/\w+/)
  })
})
