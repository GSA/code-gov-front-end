import React from 'react'
import { shallow } from 'enzyme'

import { eventMap } from 'mocks/document'
import SearchBox from 'components/search-box/search-box.component'

const event = {
  target: { value: 'test-event-value' },
  preventDefault: jest.fn(),
}

const props = {
  value: 'test-value',
  placeholder: 'test-placholder',
  inputType: 'input',
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
}

let wrapper
let instance
describe('components - SearchBox', () => {
  beforeEach(() => {
    wrapper = shallow(<SearchBox {...props} />)
    instance = wrapper.instance()
  })

  it('should default the local `value` to an empty string on initialization', () => {
    wrapper = shallow(<SearchBox {...props} value={undefined} />)
    expect(wrapper.state('value')).toBe('')
  })

  describe('componentDidMount', () => {
    it('should attach a `click` listener that focuses when clicking the text input', () => {
      // mock a ref, shallow render doesnt get refs :(
      instance.textInput = { current: 'text-input-target' }
      const event = { target: instance.textInput.current }
      eventMap.click(event)
      expect(props.onFocus).toBeCalled()
      // does not throw when `props.onFocus` not supplied
      wrapper.setProps({ onFocus: undefined })
      expect(() => eventMap.click(event)).not.toThrow()
    })

    it('should attach a `click` listener that blurs when clicking outside text input', () => {
      // mock a ref, shallow render doesnt get refs :(
      instance.textInput = { current: 'text-input-target' }
      const event = { target: 'not-the-input' }
      eventMap.click(event)
      expect(props.onBlur).toBeCalled()
      // does not throw when `props.onBlur` not supplied
      wrapper.setProps({ onBlur: undefined })
      expect(() => eventMap.click(event)).not.toThrow()
    })
  })

  describe('componentDidUpdate', () => {
    it('should udpate the local `value` when the `value` changes', () => {
      wrapper.setProps({ value: 'new-value' })
      expect(wrapper.state('value')).toBe('new-value')
    })

    it('should not try to update the local `value` if it is the same', () => {
      jest.spyOn(instance, 'setState')
      wrapper.setProps({ placeholder: 'new-placeholder' })
      expect(instance.setState).not.toBeCalled()
    })
  })

  describe('handleChange', () => {
    it('should set the local `value` as the value', () => {
      instance.handleChange(event)
      expect(wrapper.state('value')).toBe(event.target.value)
    })

    it('should call the `onChange` with the value', () => {
      instance.handleChange(event)
      expect(props.onChange).toBeCalledWith(event.target.value)
    })

    it('should not throw if `onChange` is not provided', () => {
      wrapper.setProps({ onChange: undefined })
      expect(() => instance.handleChange(event)).not.toThrow()
    })
  })

  describe('handleSubmit', () => {
    it('should call `onSubmit` with the local `value`', () => {
      instance.handleSubmit(event)
      expect(props.onSubmit).toBeCalledWith(wrapper.state('value'))
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should default the inputs `placeholder` if not provided', () => {
      wrapper.setProps({ placeholder: undefined })
      expect(wrapper.find('input').prop('placeholder')).toBeDefined()
    })

    it('should default the inputs `type` if not provided', () => {
      wrapper.setProps({ inputType: undefined })
      expect(wrapper.find('input').prop('type')).toBeDefined()
    })
  })
})