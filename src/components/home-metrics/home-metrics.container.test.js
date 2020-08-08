import { mapStateToProps } from 'components/home-metrics/home-metrics.container'

describe('containers - HomeMetrics', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
