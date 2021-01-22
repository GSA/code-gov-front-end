import React from 'react'
import { shallow } from 'enzyme'
import InventoryCodeSectionComponent from './inventory-code-section.component'

const props = {
  entry: ['version', { description: 'The version of the metadata schema in use.', type: 'string' }],
  isRequired: true,
  toggleDetails: jest.fn()
}

let wrapper
describe('components - InventoryCodeSectionComponent', () => {
  beforeEach(() => {
    wrapper = shallow(<InventoryCodeSectionComponent {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render proper left border for fields', () => {
    expect(wrapper.find('div').prop('className')).toContain('top-level')
    expect(wrapper.find('div').prop('className')).toContain('border-left-0')

    wrapper.setProps({ indent: 1 })
    expect(wrapper.find('div').prop('className')).toContain('border-left-2px')
  })

  it('should render proper text color for optional fields', () => {
    wrapper.setProps({ isRequired: false })
    expect(wrapper.find('div').prop('className')).toContain('text-accent-cool-dark')
  })

  it('should render as a button if it contains sub-entries', () => {
    expect(wrapper.find('.dropdown > div').exists()).toBeFalsy()

    wrapper.setProps({
      entry: [
        'measurementType',
        {
          properties: {
            ifOther: { type: 'string', description: 'A one- or two- sentence description...' }
          },
          type: 'object'
        }
      ]
    })
    expect(wrapper.find('button').prop('className')).toContain('api-drop-list')
  })

  it('should show subfields on click', () => {
    expect(wrapper.state('dropDown')).toBeFalsy()

    wrapper.setProps({
      entry: [
        'measurementType',
        {
          properties: {
            ifOther: { type: 'string', description: 'A one- or two- sentence description...' }
          },
          type: 'object'
        }
      ]
    })

    console.log(wrapper.debug())

    wrapper.find('.api-drop-list').simulate('click')
    expect(wrapper.state('dropDown')).toBeTruthy()
  })
})
