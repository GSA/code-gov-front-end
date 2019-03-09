import { mapStateToProps } from 'components/mobile-menu/mobile-menu.container';

describe('containers - MobileMenu', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot();
    });
  });
});
