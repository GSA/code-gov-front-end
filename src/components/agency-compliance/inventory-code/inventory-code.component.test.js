import React from 'react'
import { shallow } from 'enzyme'
import InventoryCodeComponent from './inventory-code.component'

const props = {
  schema: {},
  url: 'http://test.localdomain/assets/data/schema.json'
}

let wrapper
describe('components - InventoryCodeComponent', () => {
  beforeEach(() => {
    wrapper = shallow(<InventoryCodeComponent {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render optional entries on load', () => {
    expect(wrapper.find('#schema-viewer').prop('className')).not.toContain('hide-optional-fields')
  })

  it('should render toggle optional entries on click', () => {
    wrapper.find('#hide-optional-fields').simulate('click')
    expect(wrapper.state('optionalFields')).toBeTruthy()
    wrapper.find('#hide-optional-fields').simulate('click')
    expect(wrapper.state('optionalFields')).toBeFalsy()
  })
})
