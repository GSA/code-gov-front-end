import React from 'react'
import { shallow } from 'enzyme'

import Autocomplete from 'components/autocomplete/autocomplete.component'

const props = {
  onClick: jest.fn(),
  options: [
    { text: 'text-1', to: '/to-1' },
    { text: 'text-2', to: '/to-2' },
  ],
}

let wrapper
describe('components - Autocomplete', () => {
  beforeEach(() => {
    wrapper = shallow(<Autocomplete {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the options out', () => {
    expect(wrapper.find('li').length).toBe(props.options.length)
  })

  it('should pass the option to the onClick handler', () => {
    wrapper.findWhere(x => x.prop('onClick')).at(0).simulate('click')
    expect(props.onClick).toBeCalledWith(props.options[0])
  })
})
