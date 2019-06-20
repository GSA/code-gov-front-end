import { mapStateToProps } from 'components/footer/footer.container'

const props = {
  router: {
    location: {
      pathname: '/test-path'
    }
  }
}

describe('containers - Footer', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })

    it('should set the `color` to `white` if on the home page', () => {
      const router = { location: { pathname: PUBLIC_PATH } }
      expect(mapStateToProps({ ...props, router }).color).toBe('white')
    })
  })
})
