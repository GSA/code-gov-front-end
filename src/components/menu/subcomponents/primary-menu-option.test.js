import React from 'react'
import { shallow } from 'enzyme'

import CustomLink from 'components/custom-link'
import PrimaryMenuOption from 'components/menu/subcomponents/primary-menu-option'

const props = {
  menuOption: { name: 'option-name' },
  onClick: jest.fn(),
}

let wrapper
describe('components - Menu - PrimaryMenuOption', () => {
  beforeEach(() => {
    wrapper = shallow(<PrimaryMenuOption {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass the `menuOption` to the `onClick`', () => {
    const event = {}
    wrapper.simulate('click', event)
    expect(props.onClick).toBeCalledWith(props.menuOption, event)
  })

  it('should render a `CustomLink` if passed a url', () => {
    wrapper.setProps({ menuOption: { ...props.menuOption, url: '/test-url' } })
    expect(wrapper.find(CustomLink).length).toBe(1)
  })
})