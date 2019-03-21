import React from 'react'
import { shallow } from 'enzyme'

import CustomLink from 'components/custom-link'
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs.component'

const props = {
  crumbs: [
    { text: 'text-1', to: '/to-1' },
    { text: 'text-2', to: '/to-2' },
    { text: 'text-3' },
  ],
}

let wrapper
describe('components - Breadcrumbs', () => {
  beforeEach(() => {
    wrapper = shallow(<Breadcrumbs {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the crumbs out', () => {
    expect(wrapper.find('li').length).toBe(props.crumbs.length)
  })

  it('should render a `CustomLink` if a crumb has a `to` property', () => {
    const expected = props.crumbs.filter(x => x.to).length
    expect(wrapper.find(CustomLink).length).toBe(expected)
  })
})
