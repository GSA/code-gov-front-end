import React from 'react';
import { shallow } from 'enzyme';

import { testRenderList, testRenderEmpty } from 'testUtils/render';
import MobileMenuOption from 'components/mobile-menu-option/mobile-menu-option.component';

const props = {
  menuOption: {
    name: 'opt-1',
    url: '/opt-url',
    links: [
      { name: 'link-1', url: 'http://link-1-url' },
      { name: 'link-2', url: 'mailto:link-2-url' },
      { name: 'link-3', url: '/link-3-url' },
    ],
  },
  expandedMobileMenuOptions: ['opt-1'],
  hideMobileMenu: jest.fn(),
  toggleMobileMenuOption: jest.fn(),
};

let wrapper;
let instance;
describe('components - MobileMenuOption', () => {
  beforeEach(() => {
    wrapper = shallow(<MobileMenuOption {...props} />);
    instance = wrapper.instance();
  });

  describe('dropdown', () => {
    it('should map the menu options links out', () => {
      testRenderList(instance.dropdown, 'li', props.menuOption.links.length);
    });

    it('should not render anything if the menu option has no links', () => {
      wrapper.setProps({ menuOption: { ...props.menuOption, links: undefined } });
      testRenderEmpty(instance.dropdown);
    });

    it('should attach an `active` class name to active custom links', () => {
      jest.spyOn(instance, 'isLinkActive').mockImplementation(() => true);
      const activeLinks = shallow(instance.dropdown).findWhere(x => (
        x.prop('className') && x.prop('className').match(/active/)
      ));
      expect(activeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('isTopOptionActive', () => {
    it('should return whether the option is active if it has a `url`', () => {
      jest.spyOn(instance, 'isLinkActive').mockImplementation(() => true);
      expect(instance.isTopOptionActive()).toBeTruthy();

      instance.isLinkActive.mockImplementation(() => false);
      expect(instance.isTopOptionActive()).toBeFalsy();
    });

    it('should return whether any of the options links are active if it has no `url`', () => {
      wrapper.setProps({ menuOption: { ...props.menuOption, url: undefined } });
      jest.spyOn(instance, 'isLinkActive').mockImplementation(() => true);
      expect(instance.isTopOptionActive()).toBeTruthy();

      instance.isLinkActive.mockImplementation(() => false);
      expect(instance.isTopOptionActive()).toBeFalsy();
    });

    it('should return false if the option has no `url` or `links`', () => {
      wrapper.setProps({ menuOption: { ...props.menuOption, links: undefined, url: undefined } });
      expect(instance.isTopOptionActive()).toBeFalsy();
    });
  });

  describe('isLinkActive', () => {
    it('should return true if the windows `href` includes the `url` passed', () => {
      expect(instance.isLinkActive({ url: window.location.href })).toBeTruthy();
    });

    it('should return false if the windows `href` does not include the `url` passed', () => {
      expect(instance.isLinkActive({ url: '/not-current-href' })).toBeFalsy();
    });
  });

  describe('topoption', () => {
    describe('option with `links`', () => {
      it('should return an anchor for toggling the option', () => {
        shallow(instance.topoption).simulate('click');
        expect(props.toggleMobileMenuOption).toBeCalledWith(props.menuOption.name);
      });

      it('should attach the `active` class name if it is active', () => {
        jest.spyOn(instance, 'isTopOptionActive').mockImplementation(() => true);
        const activeClass = shallow(instance.topoption).prop('className');
        expect(activeClass).toMatch(/active/);
      });
    });

    describe('option with no `links`, and a external url', () => {
      it('should return an external link anchor that hides the menu on click', () => {
        wrapper.setProps({ menuOption: { ...props.menuOption, links: undefined, url: 'mailto:test-url' } });
        const option = shallow(instance.topoption);
        option.simulate('click');
        expect(props.hideMobileMenu).toBeCalled();
        expect(option.prop('href')).toBe('mailto:test-url');
      });
    });

    describe('option with no `links` and a custom url', () => {
      it('should return a custom link that hides the menu on click', () => {
        wrapper.setProps({ menuOption: { ...props.menuOption, links: undefined, url: '/test-url' } });
        const option = shallow(<div>{instance.topoption}</div>).children();
        option.simulate('click');
        expect(props.hideMobileMenu).toBeCalled();
        expect(option.prop('to')).toBe('/test-url');
      });

      it('should attach the `active` class name if it is active', () => {
        wrapper.setProps({ menuOption: { ...props.menuOption, links: undefined, url: '/test-url' } });
        jest.spyOn(instance, 'isTopOptionActive').mockImplementation(() => true);
        const activeClass = shallow(<div>{instance.topoption}</div>).children().prop('className');
        expect(activeClass).toMatch(/active/);
      });
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set the class name to `collapsed` if the option is not expanded', () => {
      wrapper.setProps({ expandedMobileMenuOptions: [] });
      expect(wrapper.prop('className')).toMatch(/collapsed/);
    });
  });
});