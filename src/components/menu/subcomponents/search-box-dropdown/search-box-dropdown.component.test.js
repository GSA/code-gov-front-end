import React from 'react'
import { shallow } from 'enzyme'

import client from 'api-client'
import Autocomplete from 'components/autocomplete'
import SearchBoxDropdown from 'components/menu/subcomponents/search-box-dropdown/search-box-dropdown.component'

const props = {
  onSubmit: jest.fn(),
  hideSearchDropdown: jest.fn(),
  searchDropdown: jest.fn()
}

let wrapper
let instance
describe('components - Menu - SearchBoxDropdown', () => {
  beforeEach(() => {
    wrapper = shallow(<SearchBoxDropdown {...props} />)
    instance = wrapper.instance()
    jest.spyOn(instance, 'setStateIfMounted')
  })

  describe('componentDidMount', () => {
    it('should set the component as mounted', () => {
      expect(instance.mounted).toBeTruthy()
    })
  })

  describe('componentWillUnmount', () => {
    it('should set the component as unmounted', () => {
      instance.componentWillUnmount()
      expect(instance.mounted).toBeFalsy()
    })
  })

  describe('setStateIfMounted', () => {
    it('should set state if mounted', () => {
      instance.setStateIfMounted({ test: 'test' })
      expect(wrapper.state('test')).toBeDefined()
    })

    it('should not set state if unmounted', () => {
      instance.mounted = false
      instance.setStateIfMounted({ test: 'test' })
      expect(wrapper.state('test')).not.toBeDefined()
    })
  })

  describe('handleBlur', () => {
    it('should hide the auto complete', () => {
      instance.handleBlur()
      expect(instance.setStateIfMounted).toBeCalledWith({ showAutocomplete: false })
    })
  })

  describe('handleFocus', () => {
    it('should show the auto complete', () => {
      instance.handleFocus()
      expect(instance.setStateIfMounted).toBeCalledWith({ showAutocomplete: true })
    })
  })

  describe('handleChange', () => {
    it('should update the `suggestions` and display the auto complete based off the api`s response', async () => {
      client.suggest.mockResolvedValue(['term-1', 'term-2'])
      await instance.handleChange('test-value')
      const expected = {
        showAutocomplete: true,
        suggestions: [
          expect.objectContaining({ text: 'term-1' }),
          expect.objectContaining({ text: 'term-2' })
        ]
      }
      expect(instance.setStateIfMounted).toBeCalledWith(expected)
    })
  })

  describe('handleSubmit', () => {
    it('should call the `onSubmit` passed with values submitted', () => {
      instance.handleSubmit('test-value')
      expect(props.onSubmit).toBeCalledWith('test-value')
    })
  })

  describe('hideSearchDropdown', () => {
    it('should call the `hideSearchDropdown` passed', () => {
      instance.hideSearchDropdown()
      expect(props.hideSearchDropdown).toBeCalled()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not attach the `active` class if no `searchDropdown` provided', () => {
      wrapper.setProps({ searchDropdown: undefined })
      expect(wrapper.prop('className')).not.toMatch(/active/)
    })

    it('should render the auto complete if there are suggestions and should be shown', () => {
      wrapper.setState({ showAutocomplete: true, suggestions: ['term-1', 'term-2'] })
      expect(wrapper.find(Autocomplete).length).toBe(1)
    })
  })
})
