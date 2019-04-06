import React from 'react'
import { shallow } from 'enzyme'

import HomeFeaturedProject from 'components/home-featured-project/home-featured-project.component'

const props = {
  index: 1,
  project: {
    image: 'test-image',
    alt: 'test-alt',
    short_name: 'short-name',
    verbose_name: 'verbose-name',
    author: 'test-auth',
    description: 'test-desc',
    links: [
      { name: 'http-1', url: 'http://test-url' },
      { name: 'other-1', url: '/other-url' },
      { name: 'http-2', url: 'https://test-url-2' },
    ],
  },
}

let wrapper
describe('components - HomeFeaturedProject', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeFeaturedProject {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should place the image after the content if the `index` is `odd`', () => {
    expect(wrapper.find('.width-half').at(1).find('img').length).toBe(1)
  })

  it('should place the image before the content if the `index` is `even`', () => {
    wrapper.setProps({ index: 4 })
    expect(wrapper.find('.width-half').at(0).find('img').length).toBe(1)
  })
})