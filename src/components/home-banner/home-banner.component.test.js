import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText, testRenderList, testRenderEmpty } from 'testUtils/render'
import HomeBanner from 'components/home-banner/home-banner.component'

const props = {
  motto: 'test-motto',
  subtitle: 'test-subtitle'
}

let wrapper
describe('components - HomeBanner', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeBanner {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
