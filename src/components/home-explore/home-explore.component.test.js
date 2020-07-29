import React from 'react'
import { shallow } from 'enzyme'
import HomeExplore from 'components/home-explore/home-explore.component'

const props = {
  exploreItems: [
    { title: 't1', description: 'd1', links: [{ name: 'n1', url: 'u1' }] },
    { title: 't2', description: 'd2', links: [{ name: 'n2', url: 'u2' }] },
    { title: 't3', description: 'd3', links: [{ name: 'n3', url: 'u3' }] }
  ]
}

let wrapper

describe('components - HomeExplore', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeExplore {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the `exploreItems`', () => {
    expect(wrapper.find('.explore-action').length).toBe(props.exploreItems.length)
  })
})
