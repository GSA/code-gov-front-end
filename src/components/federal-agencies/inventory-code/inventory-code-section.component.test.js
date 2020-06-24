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

  it('should render proper background color for top level entries', () => {
    expect(wrapper.find('tr').prop('className')).toContain('top-level')

    wrapper.setProps({ indent: 1 })
    expect(wrapper.find('tr').prop('className')).not.toContain('partial')
  })

  it('should render proper background color only for top level entries', () => {
    expect(wrapper.find('tr').prop('className')).toContain('top-level')

    wrapper.setProps({ isRequired: false })
    expect(wrapper.find('tr').prop('className')).toContain('optional')
  })

  it('should render drop down arrow only if it contains sub-entries', () => {
    expect(wrapper.find('.dropdown > div').exists()).toBeFalsy()

    wrapper.setProps({
      entry: [
        'measurementType',
        {
          properties: {
            ifOther: { type: 'string', dsecription: 'A one- or two- sentence description...' }
          },
          type: 'object'
        }
      ]
    })
    expect(wrapper.find('.dropdown > div').prop('className')).toContain('arrow-up-or-down')
  })

  it('should hide drop down on click', () => {
    expect(wrapper.state('dropDown')).toBeTruthy()

    wrapper.setProps({
      entry: [
        'measurementType',
        {
          properties: {
            ifOther: { type: 'string', dsecription: 'A one- or two- sentence description...' }
          },
          type: 'object'
        }
      ]
    })

    console.log(wrapper.debug())

    wrapper.find('.dropdown').simulate('click')
    expect(wrapper.state('dropDown')).toBeFalsy()
  })
})
