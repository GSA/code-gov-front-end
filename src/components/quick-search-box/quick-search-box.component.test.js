import React from 'react'
import { shallow } from 'enzyme'

import client from 'api-client'
import Autocomplete from 'components/autocomplete'
import QuickSearchBox from 'components/quick-search-box/quick-search-box.component'

const suggestions = ['term-1', 'term-2']
const props = {
  value: 'test-value',
  placeholder: 'test-placeholder',
  onSubmit: jest.fn()
}

let wrapper
let instance
describe('components - QuickSearchBox', () => {
  beforeEach(() => {
    wrapper = shallow(<QuickSearchBox {...props} />)
    instance = wrapper.instance()
    jest.spyOn(instance, 'setState')
  })

  it('should default the local `value` to an empty string on initialization', () => {
    wrapper = shallow(<QuickSearchBox {...props} value={undefined} />)
    expect(wrapper.state('value')).toBe('')
  })

  describe('componentDidMount', () => {
    it('should set the component as being mounted', () => {
      expect(instance.mounted).toBeTruthy()
    })
  })

  describe('componentWillUnmount', () => {
    it('should set the component as being unmounted', () => {
      instance.componentWillUnmount()
      expect(instance.mounted).toBeFalsy()
    })
  })

  describe('componentDidUpdate', () => {
    it('should udpate the local `value` when the `value` changes', () => {
      wrapper.setProps({ value: 'new-value' })
      expect(wrapper.state('value')).toBe('new-value')
    })

    it('should not try to update the local `value` if it is the same', () => {
      wrapper.setProps({ placeholder: 'new-placeholder' })
      expect(instance.setState).not.toBeCalled()
    })

    it('should not try to update the local `value` if the component is unmounted', () => {
      instance.mounted = false
      wrapper.setProps({ value: 'new-value' })
      expect(instance.setState).not.toBeCalled()
    })
  })

  describe('handleBlur', () => {
    it('should hide the auto complete', () => {
      wrapper.setState({ showAutocomplete: true })
      instance.handleBlur()
      expect(wrapper.state('showAutocomplete')).toBeFalsy()
    })

    it('should not update state if unmounted', () => {
      instance.mounted = false
      instance.handleBlur()
      expect(instance.setState).not.toBeCalled()
    })
  })

  describe('handleFocus', () => {
    it('should show the auto complete', () => {
      instance.handleFocus()
      expect(wrapper.state('showAutocomplete')).toBeTruthy()
    })

    it('should not update state if unmounted', () => {
      instance.mounted = false
      instance.handleFocus()
      expect(instance.setState).not.toBeCalled()
    })
  })

  describe('handleChange', () => {
    beforeEach(() => {
      client.suggest.mockResolvedValue(suggestions)
    })

    it('should update the `suggestions` and display the auto complete based off the api`s response', async () => {
      await instance.handleChange(['term-1', 'term-2'])
      const expected = {
        showAutocomplete: true,
        suggestions: [
          expect.objectContaining({ text: 'term-1' }),
          expect.objectContaining({ text: 'term-2' })
        ]
      }
      expect(wrapper.state('showAutocomplete')).toEqual(expected.showAutocomplete)
      expect(wrapper.state('suggestions')).toEqual(expected.suggestions)
    })

    it('should not update state if unmounted', async () => {
      instance.mounted = false
      await instance.handleChange(['term-1', 'term-2'])
      expect(instance.setState).not.toBeCalled()
    })
  })

  describe('handleSelection', () => {
    it('should set the value and clear suggestions', () => {
      wrapper.setState({ showAutocomplete: true, suggestions: ['sug-1', 'sug-2'] })
      instance.handleSelection({ text: 'new-value' })
      const expected = expect.objectContaining({
        showAutocomplete: false,
        suggestions: [],
        value: 'new-value'
      })
      expect(wrapper.state()).toEqual(expected)
    })

    it('should not update state if unmounted', () => {
      instance.mounted = false
      instance.handleSelection({ text: 'new-value' })
      expect(instance.setState).not.toBeCalled()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should should render a `Autocomplete` if it should show auto complete and hsa suggestions', () => {
      wrapper.setState({ showAutocomplete: true, suggestions: ['sug-1', 'sug-2'] })
      expect(wrapper.find(Autocomplete).length).toBe(1)
    })
  })
})
