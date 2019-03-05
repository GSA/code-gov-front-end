import { mapStateToProps } from 'components/footer/footer.container.js';

const props = {
  router: {
    location: {
      pathname: '/test-path',
    },
  },
};

describe('containers - Footer', () => {
  describe('mapStateToProps', () => {
    it('should map the color based off the current pathname', () => {
      const color = mapStateToProps(props).color;
      const homePageProps = { ...props, router: { location: { pathname: PUBLIC_PATH } } };
      const homeColor = mapStateToProps(homePageProps).color;
      expect(color).toBeDefined();
      expect(homeColor).toBeDefined();
      expect(color).not.toBe(homeColor);
    });

    it('should get the `links` and `logos` values from config', () => {
      const { links, logos } = mapStateToProps(props);
      expect(Array.isArray(links)).toBeTruthy();
      expect(Array.isArray(logos)).toBeTruthy();
    });
  });
});
