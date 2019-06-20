import React from 'react'
import { shallow } from 'enzyme'

import HomeAbout from 'components/home-about/home-about.component'

const props = {
  mission: 'test-mission',
  vision: 'test-vision'
}

let wrapper
describe('components - HomeAbout', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeAbout {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
