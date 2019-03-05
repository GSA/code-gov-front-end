import React from 'react';
import { shallow } from 'enzyme';

import 'mocks/api-client';
import Autocomplete from 'components/autocomplete';
import HomeBannerSearchBox from 'components/home-banner-search-box/home-banner-search-box.component';

const props = {
  onSubmit: jest.fn(),
  searchDescriptionText: 'test-text',
  searchDescriptionTextMobile: 'test-mobile-text',
  placeholder: 'test-placeholder',
  query: 'test-query',
};

let wrapper;
let instance;
describe('components - HomeBannerSearchBox', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeBannerSearchBox {...props} />);
    instance = wrapper.instance();
    jest.spyOn(wrapper, 'setState');
  });

  describe('componentDidMount', () => {
    it('should set the component as being mounted', () => {
      expect(instance.mounted).toBeTruthy();
    });
  });

  describe('componentWillUnmount', () => {
    it('should set the component as being unmounted', () => {
      instance.componentWillUnmount();
      expect(instance.mounted).toBeFalsy();
    });
  });

  describe('handleBlur', () => {
    it('should hide auto complete', () => {
      wrapper.setState({ showAutocomplete: true });
      instance.handleBlur();
      expect(wrapper.state('showAutocomplete')).toBeFalsy();
    });

    it('should not try to update state if unmounted', () => {
      instance.mounted = false;
      instance.handleBlur();
      expect(wrapper.setState).not.toBeCalled();
    });
  });

  describe('handleFocus', () => {
    it('should show auto complete', () => {
      instance.handleFocus();
      expect(wrapper.state('showAutocomplete')).toBeTruthy();
    });

    it('should not try to update state if unmounted', () => {
      instance.mounted = false;
      instance.handleFocus();
      expect(wrapper.setState).not.toBeCalled();
    });
  });

  describe('handleChange', () => {
    it('should update the `suggestions` and display the auto complete based off the api`s response', async () => {
      await instance.handleChange(['term-1', 'term-2']);
      expect(wrapper.state('showAutocomplete')).toBeTruthy();
      expect(wrapper.state('suggestions').length).toBe(2);
    });

    it('should not make any updates if unmounted', async () => {
      instance.mounted = false;
      await instance.handleChange(['term-1', 'term-2']);
      expect(wrapper.setState).not.toBeCalled();
    });
  });

  describe('handleClick', () => {
    it('should pass the `text` to the `onSubmit` provided', () => {
      instance.handleClick({ text: 'test-value' });
      expect(props.onSubmit).toBeCalledWith('test-value');
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render `searchDescriptionText` if not provided', () => {
      wrapper.setProps({ searchDescriptionText: undefined });
      expect(wrapper.find('.show-w-gt-800').length).toBe(0); // TODO: make data-test attributes...
    });

    it('should not render `searchDescriptionTextMobile` if not provided', () => {
      wrapper.setProps({ searchDescriptionTextMobile: undefined });
      expect(wrapper.find('.show-w-lte-800').length).toBe(0); // TODO: make data-test attributes...
    });

    it('should render the auto complete if there are suggestions and should be shown', () => {
      wrapper.setState({ showAutocomplete: true, suggestions: ['term-1', 'term-2'] });
      expect(wrapper.find(Autocomplete).length).toBe(1);
    });
  });
});