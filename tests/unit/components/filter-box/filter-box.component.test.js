import React from 'react';
import { mount } from 'enzyme';

import FilterBox from 'components/filter-box/filter-box.component';

const props = {
  title: 'test-title',
  options: [
    { id: 1, value: 'opt-1' },
    { id:2, value: 'opt-2' },
  ],
  onChange: jest.fn(),
};

let wrapper;
let instance;
describe('components - FilterBox', () => {
  beforeEach(() => {
    // uses 'refs' must mount instead of shallow
    wrapper = mount(<FilterBox {...props} />);
    instance = wrapper.instance();
  });

  describe('componentDidMount', () => {
    it('should attach a change handler for the fitler box', () => {
      // override read only tagName value...
      Object.defineProperty(wrapper.ref('filterBox'), 'tagName', { value: 'input' });
      wrapper.ref('filterBox').value = 'test-value';
      wrapper.ref('filterBox').dispatchEvent(new Event('change'));
      expect(props.onChange).toBeCalledWith({ type: 'unchecked', value: 'test-value' });
    });

    it('should attach determine the `type` to change by the `checked` attribute', () => {
      Object.defineProperty(wrapper.ref('filterBox'), 'tagName', { value: 'input' });
      wrapper.ref('filterBox').value = 'test-value';
      wrapper.ref('filterBox').checked = true;
      wrapper.ref('filterBox').dispatchEvent(new Event('change'));
      expect(props.onChange).toBeCalledWith({ type: 'checked', value: 'test-value' });
    });

    it('should only call `onChange` if the tag is an `input`', () => {
      Object.defineProperty(wrapper.ref('filterBox'), 'tagName', { value: 'p' });
      wrapper.ref('filterBox').dispatchEvent(new Event('change'));
      expect(props.onChange).not.toBeCalled();
    });
  });

  describe('shouldComponentUpdate', () => {
    it('should update if next props are not current props', () => {
      const nextProps = { ...props, options: [{ id: 99, value: 'opt-99' }] };
      expect(instance.shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('should not update if next props are the same as current props', () => {
      expect(instance.shouldComponentUpdate(props)).toBeFalsy();
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});