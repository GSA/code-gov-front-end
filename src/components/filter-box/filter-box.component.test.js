import React from 'react'
import { shallow } from 'enzyme'

import FilterBox from 'components/filter-box/filter-box.component'

const props = {
  title: 'test-title',
  options: JSON.stringify([
    { id: 1, value: 'opt-1' },
    { id: 2, value: 'opt-2' },
    { id: 3, value: 'opt-3' },
    { id: 4, value: 'opt-4' },
    { id: 5, value: 'opt-5' }
  ]),
  onChange: jest.fn()
}

let wrapper
let instance
describe('components - FilterBox', () => {
  beforeEach(() => {
    wrapper = shallow(<FilterBox {...props} />)
    instance = wrapper.instance()
  })

  describe('onChange', () => {
    it('should be called for checkbox input onChange', () => {
      const event = {
        target: { checked: false, value: 'test-value', tagName: 'INPUT' }
      }
      const input = wrapper.find('input[value="opt-1"]')
      input.simulate('change', event)
      expect(props.onChange).toBeCalledWith({ type: 'unchecked', value: 'test-value' })
    })
  })

  describe('handleKeyDown', () => {
    it('should inverse the value of showAll state if enter key is pressed', () => {
      const event = {
        keyCode: 13
      }
      wrapper.setState({ showAll: false })

      // false => true
      instance.handleKeyDown(event)
      expect(wrapper.state('showAll')).toBeTruthy()

      // true => false
      instance.handleKeyDown(event)
      expect(wrapper.state('showAll')).toBeFalsy()
    })
    it('should call preventDefault if space bar is pressed', () => {
      const event = {
        keyCode: 32,
        preventDefault: jest.fn()
      }
      instance.handleKeyDown(event)
      expect(event.preventDefault).toBeCalled()
    })
  })

  describe('handleKeyUp', () => {
    it('should inverse the value of showAll state if space bar is pressed', () => {
      const event = {
        keyCode: 32
      }
      wrapper.setState({ showAll: false })

      // false => true
      instance.handleKeyUp(event)
      expect(wrapper.state('showAll')).toBeTruthy()

      // true => false
      instance.handleKeyUp(event)
      expect(wrapper.state('showAll')).toBeFalsy()
    })
  })

  describe('handleClickToggle', () => {
    it('should inverse the value of showAll state if moreLessToggle is clicked', () => {
      const event = {
        preventDefault: jest.fn()
      }
      wrapper.setState({ showAll: false })

      // false => true
      instance.handleClickToggle(event)
      expect(wrapper.state('showAll')).toBeTruthy()

      // true => false
      instance.handleClickToggle(event)
      expect(wrapper.state('showAll')).toBeFalsy()
    })
  })

  describe('handleExpand', () => {
    it('should inverse the value of accordionExpand state if the accordion title button is clicked', () => {
      wrapper.setState({ accordionExpand: true })
      // true => false
      instance.handleExpand()
      expect(wrapper.state('accordionExpand')).toBeFalsy()

      // false => true
      instance.handleExpand()
      expect(wrapper.state('accordionExpand')).toBeTruthy()
    })
  })
  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
