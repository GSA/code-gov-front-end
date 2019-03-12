import { mapStateToProps } from 'components/home-about/home-about.container'

describe('containers - HomeAbout', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
