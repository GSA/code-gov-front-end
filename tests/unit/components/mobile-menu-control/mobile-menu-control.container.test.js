import hideMobileMenu from 'actions/hide-mobile-menu';
import showMobileMenu from 'actions/show-mobile-menu';
import toggleMobileMenu from 'actions/toggle-mobile-menu';
import { mapStateToProps, mapDispatchToProps } from 'components/mobile-menu-control/mobile-menu-control.container';

jest.mock('actions/hide-mobile-menu');
jest.mock('actions/show-mobile-menu');
jest.mock('actions/toggle-mobile-menu');

const props = {
  router: {
    location: {
      pathname: '/test-path',
    },
  },
  displayMobileMenu: true,
};

const dispatch = jest.fn();

describe('containers - MobileMenuControl', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot();
    });

    it('should set the `color` to `white` if on the home page', () => {
      const router = { location: { pathname: PUBLIC_PATH } }
      expect(mapStateToProps({ ...props, router }).color).toBe('white');
    });
  });

  describe('mapDispatchToProps', () => {
    describe('hideMobileMenu', () => {
      it('should dispatch the `hideMobileMenu` action', () => {
        mapDispatchToProps(dispatch).hideMobileMenu();
        expect(dispatch).toBeCalled();
        expect(hideMobileMenu).toBeCalled();
      });
    });

    describe('hideMobileMenu', () => {
      it('should dispatch the `showMobileMenu` action', () => {
        mapDispatchToProps(dispatch).showMobileMenu();
        expect(dispatch).toBeCalled();
        expect(showMobileMenu).toBeCalled();
      });
    });

    describe('toggleMobileMenu', () => {
      it('should dispatch the `toggleMobileMenu` action', () => {
        mapDispatchToProps(dispatch).toggleMobileMenu();
        expect(dispatch).toBeCalled();
        expect(toggleMobileMenu).toBeCalled();
      });
    });
  });
});
