import React from 'react'
import { shallow } from 'enzyme'

import { refreshView } from 'utils/other'
import AboutCodeDotGov from 'components/about-codedotgov/about.component'

jest.mock('utils/other')

const props = {
  aboutCodeDotGov: 'test-about'
}

let wrapper
describe('components - AboutCodeDotGov', () => {
  beforeEach(() => {
    wrapper = shallow(<AboutCodeDotGov {...props} />)
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
