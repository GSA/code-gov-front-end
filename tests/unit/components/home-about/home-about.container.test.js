import { mapStateToProps } from 'components/home-about/home-about.container.js';

describe('containers - HomeAbout', () => {
  describe('mapStateToProps', () => {
    it('should get the `mission` and `aboutItems` values from config', () => {
      const { mission, aboutItems } = mapStateToProps();
      expect(mission).toBeDefined();
      expect(Array.isArray(aboutItems)).toBeTruthy();
    });
  });
});
