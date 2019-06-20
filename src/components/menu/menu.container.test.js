import toggleSearchDropdown from 'actions/toggle-search-dropdown'
import { mapStateToProps, mapDispatchToProps } from 'components/menu/menu.container'

jest.mock('actions/toggle-search-dropdown')

const props = {
  router: {
    location: {
      pathname: '/test-path'
    }
  },
  searchDropdown: 'test-search-dropdown'
}

const dispatch = jest.fn()

describe('containers - Menu', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })

    it('should set the `color` to `white` if on the home page', () => {
      const router = { location: { pathname: PUBLIC_PATH } }
      expect(mapStateToProps({ ...props, router }).color).toBe('white')
    })
  })

  describe('mapDispatchToProps', () => {
    describe('toggleSearchDropdown', () => {
      it('should dispatch the `toggleSearchDropdown` action', () => {
        mapDispatchToProps(dispatch).toggleSearchDropdown()
        expect(dispatch).toBeCalled()
        expect(toggleSearchDropdown).toBeCalled()
      })
    })
  })
})
