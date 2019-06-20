import { mapStateToProps, mapDispatchToProps } from 'components/home-banner/home-banner.container'

describe('containers - HomeBanner', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
