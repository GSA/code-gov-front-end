import React from 'react'
import { shallow } from 'enzyme'
import QualityPopover from 'components/quality-popover/quality-popover.component'

const props = {}

const popoverToggle = jest.fn()

let wrapper
let instance
describe('components - QualityPopover', () => {
  beforeEach(() => {
    wrapper = shallow(<QualityPopover {...props} />)
    instance = wrapper.instance()
  })

  describe('onClick', () => {
    it('should toggle `activated`', () => {
      document.body.innerHTML =
        '<div id="data-quality-popover" className="padding-top-3" hidden> </div>'
      instance.onClick()
      expect(wrapper.state('activated')).toBeTruthy()
      instance.onClick()
      expect(wrapper.state('activated')).toBeFalsy()
    })

    it('should toggle popover', () => {
      document.body.innerHTML =
        '<div id="data-quality-popover" className="padding-top-3" hidden> </div>'
      instance.onPopoverToggle()
      expect(
        wrapper.findWhere(x => x.prop('hidden') && x.prop('id').match('data-quality-popover'))
          .length
      ).toBe(1)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
