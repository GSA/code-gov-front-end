import { mapStateToProps } from 'components/site-banner/site-banner.container'

describe('containers - MobileMenuOption', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
