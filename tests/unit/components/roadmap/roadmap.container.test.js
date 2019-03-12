import { mapStateToProps } from 'components/roadmap/roadmap.container'

describe('containers - Roadmap', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
