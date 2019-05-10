import { mapStateToProps } from 'components/home-featured-projects/home-featured-projects.container'

describe('containers - HomeFeaturedProjects', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
