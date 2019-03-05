import React from 'react';
import { shallow } from 'enzyme';

import Footer from 'components/footer/footer.component';

const props = {
  color: 'black',
  links: [
    { name: 'http-1', url: 'http://link-1' },
    { name: 'mail-1', url: 'mailto:email@a.com' },
    { name: 'custom-1', url: '/custom-link' },
    { name: 'http-2', url: 'https://link-1' },
  ],
  logos: [
    { name: 'logo-1', url: '/logo-1.png', image: 'logo-src-1' },
    { name: 'logo-2', url: '/logo-2.png', image: 'logo-src-2' },
  ],
};

let wrapper;
describe('components - Footer', () => {
  beforeEach(() => {
    wrapper = shallow(<Footer {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map all the links out', () => {
    expect(wrapper.find('[data-test="links"] li').length).toBe(props.links.length);
  });

  it('should map all the logos out', () => {
    expect(wrapper.find('[data-test="logos"] li').length).toBe(props.logos.length);
  });
});