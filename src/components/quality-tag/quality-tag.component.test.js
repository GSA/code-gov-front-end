import React from 'react'
import { shallow } from 'enzyme'
import QualityTag from 'components/quality-tag/quality-tag.component'

const props = {
  score: 8.9
}

let wrapper
let instance
describe('components - QualityTag', () => {
  beforeEach(() => {
    wrapper = shallow(<QualityTag {...props} />)
    instance = wrapper.instance()
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render a green quality tag if high data quality score', () => {
      wrapper.setProps({ score: 8.9 })
      expect(wrapper.find('div').prop('className')).toBe(
        'height-4 pin-right width-6 radius-lg display-flex flex-column flex-justify-center margin-top-205 margin-right-3 bg-success-dark'
      )
    })

    it('should render a yellow/brown quality tag if medium data quality score', () => {
      wrapper.setProps({ score: 5.2 })
      expect(wrapper.find('div').prop('className')).toBe(
        'height-4 pin-right width-6 radius-lg display-flex flex-column flex-justify-center margin-top-205 margin-right-3 bg-warning-darker'
      )
    })

    it('should render a red quality tag if low data quality score', () => {
      wrapper.setProps({ score: 2.7 })
      expect(wrapper.find('div').prop('className')).toBe(
        'height-4 pin-right width-6 radius-lg display-flex flex-column flex-justify-center margin-top-205 margin-right-3 bg-error-dark'
      )
    })
  })
})
