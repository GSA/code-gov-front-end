import React from 'react';
import { shallow } from 'enzyme';

import HomeAbout from 'components/home-about/home-about.component';

const props = {
  mission: 'test-mission',
  aboutItems: [
    { title: 't1', link: 'l1', image: 'i1', description: 'd1' },
    { title: 't2', link: 'l2', image: 'i2', description: 'd2' },
  ]
};

let wrapper;
describe('components - HomeAbout', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeAbout {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map all the `aboutItems`', () => {
    expect(wrapper.find('li').length).toBe(props.aboutItems.length);
  });

  it('should not throw if `aboutItems` not provided', () => {
    wrapper.setProps({ aboutItems: undefined });
    expect(wrapper.html()).not.toBeFalsy();
  });
});