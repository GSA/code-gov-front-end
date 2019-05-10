import React from 'react'
import { shallow } from 'enzyme'

import CustomLink from 'components/custom-link/custom-link.component'

const props = {
  to: '/test-to',
  onClick: jest.fn(),
  updateStore: jest.fn(),
  className: 'test-class',
}

let wrapper
describe('components - CustomLink', () => {
  beforeEach(() => {
    wrapper = shallow(<CustomLink {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render children provided', () => {
    const Child = () => <div>child</div>
    wrapper.setProps({ children: <Child /> })
    expect(wrapper.find(Child).length).toBe(1)
  })

  it('should update the store with the `to` on click', () => {
    wrapper.simulate('click')
    expect(props.updateStore).toBeCalledWith(props.to)
  })

  it('should call the `onClick` passed on click', () => {
    wrapper.simulate('click')
    expect(props.onClick).toBeCalled()
  })

  it('should not throw on click if no `onClick` passed', () => {
    wrapper.setProps({ onClick: undefined })

    let error
    try {
      wrapper.simulate('click')
    } catch (err) {
      error = err
    } finally {
      expect(error).toBeUndefined()
    }
  })
})