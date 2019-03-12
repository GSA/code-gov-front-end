import React from 'react'
import { shallow } from 'enzyme'

import { eventMap } from 'mocks/document'
import QualityPopover from 'components/quality-popover/quality-popover.component'

const props = {

}

let wrapper
let instance
describe('components - QualityPopover', () => {
  beforeEach(() => {
    wrapper = shallow(<QualityPopover {...props} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should attach a `click` listener that sets as inactive if clicked outside the icon', () => {
      wrapper.setState({ activated: true })
      // shallow render does not give refs, so mocking here
      instance.icon = { current: 'icon-target' }
      // click on icon, should do nothing
      eventMap.click({ target: 'icon-target' })
      expect(wrapper.state('activated')).toBeTruthy()
      // click outside icon, should make inactive
      eventMap.click({ target: 'other-target' })
      expect(wrapper.state('activated')).toBeFalsy()
    })
  })

  describe('onClick', () => {
    it('should toggle `activated`', () => {
      instance.onClick()
      expect(wrapper.state('activated')).toBeTruthy()
      instance.onClick()
      expect(wrapper.state('activated')).toBeFalsy()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should attach an `activated` class if `activated`', () => {
      wrapper.setState({ activated: true })

      expect(
        wrapper.findWhere(x =>
          x.prop('className')
          && x.prop('className').match('activated')
        ).length
      ).toBe(1)
    })
  })
})