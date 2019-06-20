import { push } from 'connected-react-router'

import hideMobileMenu from 'actions/hide-mobile-menu'
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options'
import updateSearchParams from 'actions/update-search-params'
import { getSection } from 'utils/url-parsing'
import { mapDispatchToProps } from 'components/mobile-menu-search-box/mobile-menu-search-box.container'

jest.mock('connected-react-router')
jest.mock('actions/hide-mobile-menu')
jest.mock('actions/collapse-all-mobile-menu-options')
jest.mock('actions/update-search-params')
jest.mock('utils/url-parsing')

const dispatch = jest.fn()

describe('containers - MobileMenuSearchBox', () => {
  describe('mapDispatchToProps', () => {
    describe('onSubmit', () => {
      it('should dispatch the correct actions', () => {
        mapDispatchToProps(dispatch).onSubmit('test-query')
        expect(dispatch).toBeCalledTimes(4)
        expect(updateSearchParams).toBeCalledWith({ page: 1, size: 10, query: 'test-query', filters: [] })
        expect(push).toBeCalledWith(`/search?page=1&query=test-query&size=10&sort=best_match`)
        expect(collapseAllMobileMenuOptions).toBeCalled()
        expect(hideMobileMenu).toBeCalled()
      })

      it('should not dispatch the `push` action if on the `search` section', () => {
        getSection.mockImplementation(() => 'search')
        mapDispatchToProps(dispatch).onSubmit('test-query')
        expect(push).not.toBeCalled()
      })
    })
  })
})
