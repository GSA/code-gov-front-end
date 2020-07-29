import React from 'react'
import { shallow } from 'enzyme'
import GovBanner from 'components/gov-banner/gov-banner.component'

const props = {}

let wrapper
let instance
describe('components - GovBanner', () => {
  beforeEach(() => {
    wrapper = shallow(<GovBanner {...props} />)
    instance = wrapper.instance()
  })

  describe('toggleDropDown', () => {
    it('should inverse the state of dropDown when the accordion dropdown button is clicked', () => {
      wrapper.setState({ dropDown: false })
      // false => true
      instance.toggleDropDown()
      expect(wrapper.state('dropDown')).toBeTruthy()

      // true => false
      instance.toggleDropDown()
      expect(wrapper.state('dropDown')).toBeFalsy()
    })
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
