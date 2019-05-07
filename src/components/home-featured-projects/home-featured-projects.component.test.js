import React from 'react'
import { shallow } from 'enzyme'

import HomeFeaturedProject from 'components/home-featured-project/home-featured-project.component'
import HomeFeaturedProjects from 'components/home-featured-projects/home-featured-projects.component'

const props = {
  featuredProjects: [
    { short_name: 'project-1' },
    { short_name: 'project-2' },
  ],
}

let wrapper
describe('components - HomeFeaturedProjects', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeFeaturedProjects {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map a list of `HomeFeaturedProject`s based off the `featuredProjects` props', () => {
    expect(wrapper.find(HomeFeaturedProject).length).toBe(props.featuredProjects.length)
  })

  it('should not display any `HomeFeaturedProject`s if not supplied any `featuredProjects`', () => {
    wrapper.setProps({ featuredProjects: undefined })
    expect(wrapper.find(HomeFeaturedProject).length).toBe(0)
  })
})