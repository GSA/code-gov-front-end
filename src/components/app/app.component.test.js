import React from 'react'
import { shallow } from 'enzyme'

import { eventMap } from 'mocks/window'
import { refreshView } from 'utils/other'
import App from 'components/app/app.component'

jest.mock('utils/other')

const props = {
  rehydrate: jest.fn(),
}

let wrapper
describe('components - App', () => {
  beforeEach(() => {
    wrapper = shallow(<App {...props} />)
  })

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled()
    })

    it('should attach an event listener for rehydrating on `popstate`', () => {
      eventMap.popstate() // trigger mock popstate event
      expect(props.rehydrate).toBeCalled()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
