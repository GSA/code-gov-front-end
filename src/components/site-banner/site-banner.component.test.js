import React from 'react'
import { shallow } from 'enzyme'

import SiteBanner from 'components/site-banner/site-banner.component'

const props = {
  title: 'test-title'
}

let wrapper
describe('components - SiteBanner', () => {
  beforeEach(() => {
    wrapper = shallow(<SiteBanner {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
