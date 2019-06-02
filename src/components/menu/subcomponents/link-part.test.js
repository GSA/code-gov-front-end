import React from 'react'
import { shallow } from 'enzyme'

import LinkPart from 'components/menu/subcomponents/link-part'
import findByTestAttr from '../../../../tests/testUtils/findByTestAttr'

const defaultProps = {
  name: 'option-name',
  url: 'http://link-2-url',
  onClick: jest.fn()
}

function setup(props = {}) {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<LinkPart {...setupProps} />)
}

let wrapper
describe.only('components - Menu - LinkPart Component', () => {
  beforeEach(() => {
    wrapper = setup()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`should not return an anchor tag with our data-testid attribute when url doesn't start with http or mailto`, () => {
    wrapper = setup({ url: '/link-1-url' })
    const component = findByTestAttr(wrapper, 'link-part-anchor')
    expect(component.length).toBe(0)
  })

  it(`should return an anchor tag with our data-testid attribute when url starts with http`, () => {
    const component = findByTestAttr(wrapper, 'link-part-anchor')
    expect(component.length).toBe(1)
  })
})
