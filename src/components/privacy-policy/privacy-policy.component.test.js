import React from 'react'
import { shallow } from 'enzyme'

import { refreshView } from 'utils/other'
import PrivacyPolicy from 'components/privacy-policy/privacy-policy.component'

jest.mock('utils/other')

const props = {
  privacyPolicy: 'test-privacy-policy',
}

let wrapper
describe('components - PrivacyPolicy', () => {
  beforeEach(() => {
    wrapper = shallow(<PrivacyPolicy {...props} />)
  })

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})