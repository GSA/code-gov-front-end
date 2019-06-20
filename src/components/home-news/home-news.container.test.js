import { mapStateToProps } from 'components/home-news/home-news.container'

describe('containers - HomeNews', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
