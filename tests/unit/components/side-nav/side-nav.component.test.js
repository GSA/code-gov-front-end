import React from 'react'
import { shallow } from 'enzyme'

import SideNav, { SideNavPart } from 'components/side-nav/side-nav.component'

const props = {
  alignment: 'left',
  baseurl: '/test-url',
  links: [
    { text: 'link-1', route: '/link-1', children: [{ text: 'child-1', route: '/child-1' }] },
    { text: 'link-2', route: '/link-2' },
  ],
  onLinkClick: jest.fn(),
}

let wrapper
describe('components - SideNav', () => {
  beforeEach(() => {
    wrapper = shallow(<SideNav {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should provide default values to SideNavPart', () => {
    wrapper = shallow(<SideNav />).find(SideNavPart)
    expect(wrapper.prop('baseurl')).toBeDefined()
    expect(wrapper.prop('links')).toBeDefined()
  })

  describe('SideNavPart', () => {
    it('should render correctly', () => {
      const { alignment, ...rest } = props
      expect(shallow(<SideNavPart {...rest} />)).toMatchSnapshot()
    })

    it('should render nothing if no links', () => {
      expect(shallow(<SideNavPart links={[]} />).html()).toBeFalsy()
    })

    it('should call `onLinkClick` on click if provided', () => {
      const { alignment, ...rest } = props
      // click first link
      const clickLink = (navProps) => (
        shallow(<SideNavPart {...navProps} />)
          .findWhere(x => x.prop('to'))
          .at(0)
          .prop('onClick')()
      )
      // onLinkClick provided, calls it
      clickLink(rest)
      expect(props.onLinkClick).toBeCalled()
      // onLinkClick not provided, does not throw
      expect(() => clickLink({ ...rest, onLinkClick: undefined })).not.toThrow()
    })
  })
})