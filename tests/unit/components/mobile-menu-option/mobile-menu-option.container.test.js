import hideMobileMenu from 'actions/hide-mobile-menu';
import toggleMobileMenuOption from 'actions/toggle-mobile-menu-option';
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options';
import { mapStateToProps, mapDispatchToProps } from 'components/mobile-menu-option/mobile-menu-option.container';

jest.mock('actions/hide-mobile-menu');
jest.mock('actions/toggle-mobile-menu-option');
jest.mock('actions/collapse-all-mobile-menu-options');

const props = {
  expandedMobileMenuOptions: ['option-1', 'option-2'],
};

const dispatch = jest.fn();

describe('containers - MobileMenuOption', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    describe('hideMobileMenu', () => {
      it('should dispatch the correct actions', () => {
        mapDispatchToProps(dispatch).hideMobileMenu();
        expect(dispatch).toBeCalledTimes(2);
        expect(collapseAllMobileMenuOptions).toBeCalled();
        expect(hideMobileMenu).toBeCalled();
      });
    });

    describe('toggleMobileMenuOption', () => {
      it('should dispatch the `toggleMobileMenuOption` action', () => {
        mapDispatchToProps(dispatch).toggleMobileMenuOption();
        expect(dispatch).toBeCalled();
        expect(toggleMobileMenuOption).toBeCalled();
      });
    });
  });
});
