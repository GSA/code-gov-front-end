import React from 'react';
import { shallow } from 'enzyme';

import MobileMenuControl from 'components/mobile-menu-control/mobile-menu-control.component';

const props = {
  color: 'white',
  displayMobileMenu: false,
  toggleMobileMenu: jest.fn(),
};

let wrapper;
describe('components - MobileMenuControl', () => {
  beforeEach(() => {
    wrapper = shallow(<MobileMenuControl {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should attach a `dark` class name to the menu button if the color is `dark`', () => {
    wrapper.setProps({ color: 'dark' });
    expect(wrapper.find('mobile-menu-button').prop('class')).toMatch(/dark/); // should be className...
  });
});