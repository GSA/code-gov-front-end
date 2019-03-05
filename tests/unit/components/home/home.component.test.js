import React from 'react';
import { shallow } from 'enzyme';

import { eventMap } from 'mocks/window';
import { refreshView } from 'utils/other';
import Home from 'components/home/home.component';

jest.mock('utils/other');

const props = {};

let wrapper;
describe('components - Home', () => {
  beforeEach(() => {
    wrapper = shallow(<Home {...props} />);
  });

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled();
    });

    it('should attach an event listener for refreshing the view on `popstate`', () => {
      jest.resetAllMocks();
      window.history.pushState({}, 'Public Path', PUBLIC_PATH);
      eventMap.popstate(); // trigger mock popstate event
      expect(refreshView).toBeCalled();
    });

    it('should not trigger a refresh view on `popstate` if the pathname is not the `PUBLIC_PATH`', () => {
      jest.resetAllMocks();
      window.history.pushState({}, 'Test Route', '/test-route');
      eventMap.popstate();
      expect(refreshView).not.toBeCalled();
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});