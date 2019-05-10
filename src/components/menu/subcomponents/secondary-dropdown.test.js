import React from 'react'
import { shallow } from 'enzyme'

import SecondaryDropdown from 'components/menu/subcomponents/secondary-dropdown'

const props = {
  menuOption: {
    name: 'option-name',
    links: [
      { name: 'link-1', url: '/link-1-url' },
      { name: 'link-2', url: 'http://link-2-url' },
      { name: 'link-3', url: 'mailto:link-3-url' },
    ],
  },
  onClick: jest.fn(),
}

let wrapper
describe('components - Menu - SecondaryDropdown', () => {
  beforeEach(() => {
    wrapper = shallow(<SecondaryDropdown {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render nothing if no menu option links', () => {
    wrapper.setProps({ menuOption: { ...props.menuOption, links: undefined } })
    expect(wrapper.html()).toBeFalsy()
  })
})