import { mapStateToProps } from 'components/privacy-policy/privacy-policy.container'

describe('containers - PrivacyPolicy', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps()).toMatchSnapshot()
    })
  })
})
