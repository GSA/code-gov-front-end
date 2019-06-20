import { mapStateToProps } from 'components/home-explore/home-explore.container'

describe('containers - HomeExplore', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
