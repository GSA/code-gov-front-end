import React from 'react'
import { shallow } from 'enzyme'

import HomePress from 'components/home-press/home-press.component'

const props = {
  backgroundImage: 'test-bg-img',
  quote: 'test-quote',
  attributionUrl: '/test-attribution-url',
  attributionImage: 'test-attribution-img',
  links: [
    { image: 'link-image-1', url: '/link-url-1', alt: 'link-alt-1' },
    { image: 'link-image-2', url: '/link-url-2', alt: 'link-alt-2' },
  ],
}

let wrapper
describe('components - HomePress', () => {
  beforeEach(() => {
    wrapper = shallow(<HomePress {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render nothing for empty `links`', () => {
    wrapper.setProps({ links: undefined })
    expect(wrapper.find('.press-links li').length).toBe(0)
  })
})