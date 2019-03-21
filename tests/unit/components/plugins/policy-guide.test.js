import React from 'react'
import { shallow } from 'enzyme'

import { eventMap, push } from 'mocks/window'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import PolicyGuide, { PolicyGuidePage } from 'components/plugins/policy-guide'

jest.mock('utils/other')

const props = {
  match: {
    url: '/test-route',
  },
}

let wrapper
let instance
describe('components - PolicyGuide', () => {
  beforeEach(() => {
    wrapper = shallow(<PolicyGuide {...props} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled()
    })

    it('should attach a `popstate` event listener for scrolling to the top of results', () => {
      // pathname does not start with `policy-guide/`, no scrolling
      eventMap.popstate()
      expect(scrollToTopOfResults).not.toBeCalled()
      // pathname starts with `policy-guide/`, scroll to top
      push('/policy-guide/test-1')
      eventMap.popstate()
      expect(scrollToTopOfResults).toBeCalled()
    })
  })

  describe('onNavChange', () => {
    it('should scroll to the top of the results', () => {
      instance.onNavChange()
      expect(scrollToTopOfResults).toBeCalled()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('components - PolicyGuide - PolicyGuidePage', () => {
  it('should render correctly', () => {
    wrapper = shallow(<PolicyGuidePage url={'/test-url'} />)
    expect(wrapper).toMatchSnapshot()
  })
})