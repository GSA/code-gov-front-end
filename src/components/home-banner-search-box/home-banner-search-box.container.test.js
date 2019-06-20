import { push } from 'connected-react-router'

import updateSearchParams from 'actions/update-search-params'
import { mapStateToProps, mapDispatchToProps } from 'components/home-banner-search-box/home-banner-search-box.container'

jest.mock('connected-react-router')
jest.mock('actions/update-search-params')

const props = {
  query: 'test-query',
}

const dispatch = jest.fn()

describe('containers - HomeBannerSearchBox', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    describe('onSubmit', () => {
      describe('section is `search`', () => {
        xit('should dispatch the `updateSearchParams` action with the correct params', () => {
          // BUG: missing call to getSection...?
        })
      })

      describe('section is not `search`', () => {
        it('should dispatch the `updateSearchParams` action with the correct params', () => {
          mapDispatchToProps(dispatch).onSubmit(props.query)
          expect(dispatch).toBeCalled()
          expect(updateSearchParams).toBeCalledWith({ page: 1, query: props.query, size: 10, sort: 'best_match', filters: [] })
        })

        it('should dispatch the `push` action with the correct params', () => {
          mapDispatchToProps(dispatch).onSubmit(props.query)
          expect(dispatch).toBeCalled()
          expect(push).toBeCalledWith(`/search?page=1&query=${props.query}&size=10&sort=best_match`)
        })
      })
    })
  })
})
