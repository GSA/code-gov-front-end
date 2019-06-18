import React from 'react'
import { shallow } from 'enzyme'

import OfficialBanner from 'components/official-banner/official-banner.component'
import findByTestAttr from '../../../tests/testUtils/findByTestAttr'

const props = {}

let wrapper
describe('components - OfficialBanner', () => {
  beforeEach(() => {
    wrapper = shallow(<OfficialBanner {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the light banner by default', () => {
    expect(findByTestAttr(wrapper, 'component-gov-banner').length).toBe(1)
  })

  it('should render the dark banner when isDark is true', () => {
    wrapper.setProps({ isDark: true })
    expect(findByTestAttr(wrapper, 'component-gov-banner-dark').length).toBe(1)
  })
})
