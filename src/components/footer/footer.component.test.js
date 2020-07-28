import React from 'react'
import { shallow } from 'enzyme'

import Footer from 'components/footer/footer.component'

const props = {
  color: 'black',
  links: [
    { name: 'http-1', url: 'http://link-1' },
    { name: 'mail-1', url: 'mailto:email@a.com' },
    { name: 'custom-1', url: '/custom-link' },
    { name: 'http-2', url: 'https://link-1' }
  ],
  logos: [
    { name: 'logo-1', url: '/logo-1.png', image: 'logo-src-1' },
    { name: 'logo-2', url: '/logo-2.png', image: 'logo-src-2' },
    { name: 'logo-3', url: '/logo-3.png', image: 'logo-src-3' },
    { name: 'logo-4', url: '/logo-4.png', image: 'logo-src-4' }
  ],
  socials: [
    { name: 'social-1', url: 'u1', icon: 'i1' },
    { name: 'social-2', url: 'u2', icon: 'i2' },
    { name: 'social-3', url: 'u3', icon: 'i3' },
    { name: 'social-4', url: 'u4', icon: 'i4' }
  ]
}

let wrapper
describe('components - Footer', () => {
  beforeEach(() => {
    wrapper = shallow(<Footer {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the links out', () => {
    expect(wrapper.find('[data-test="links"] li').length).toBe(props.links.length)
  })

  it('should map all the logos out', () => {
    expect(wrapper.find('[data-test="logos"] li').length).toBe(props.logos.length)
  })

  it('should map all the social media icons out', () => {
    expect(wrapper.find('[data-test="socials"] li').length).toBe(props.socials.length)
  })
})
