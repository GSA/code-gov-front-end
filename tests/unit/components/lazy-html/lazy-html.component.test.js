import React from 'react'
import { shallow } from 'enzyme'

import { getText } from 'utils/other'
import LazyHTML from 'components/lazy-html/lazy-html.component'

jest.mock('utils/other')

const props = {
  url: '/test-url',
  onUpdate: jest.fn(),
}

let wrapper
let instance
describe('components - LazyHTML', () => {
  beforeEach(() => {
    getText.mockImplementation(() => Promise.resolve('test-html'))
    wrapper = shallow(<LazyHTML {...props} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should set as being mounted', () => {
      expect(instance.mounted).toBeTruthy()
    })

    it('should load the text from the `url` passed', () => {
      expect(getText).toBeCalledWith(props.url)
    })

    it('should set the html as the loaded text', () => {
      expect(wrapper.state('html')).toBe('test-html')
    })

    it('should not try to refetch the text', async () => {
      jest.resetAllMocks()
      await instance.componentDidMount()
      expect(getText).not.toBeCalled()
    })

    it('should not try setting the html if not mounted', async () => {
      jest.spyOn(wrapper, 'setState')
      getText.mockImplementation(() => {
        instance.mounted = false // unmounted mid fetch
        return Promise.resolve('new-test-html')
      })
      instance.loading = false
      await instance.componentDidMount()
      expect(wrapper.setState).not.toBeCalled()
    })
  })

  describe('componentDidUpdate', () => {
    it('should call `onUpdate`', () => {
      instance.componentDidUpdate()
      expect(props.onUpdate).toBeCalled()
    })

    it('should not try to call `onUpdate` if not passed one', () => {
      wrapper.setProps({ onUpdate: undefined })
      expect(() => instance.componentDidUpdate()).not.toThrow()
    })
  })

  describe('componentWillUnmount', () => {
    it('should set the component as unmounted', () => {
      instance.componentWillUnmount()
      expect(instance.mounted).toBeFalsy()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render a loading indicator before html is loaded', () => {
      getText.mockImplementation(() => ({ then: jest.fn() })) // unresolved
      wrapper = shallow(<LazyHTML {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})