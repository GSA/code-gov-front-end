import { mapStateToProps } from 'components/home-press/home-press.container'

describe('containers - HomePress', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
