import { push } from 'connected-react-router'

import hideSearchDropdown from 'actions/hide-search-dropdown'
import updateSearchParams from 'actions/update-search-params'
import { getSection } from 'utils/url-parsing'
import { mapStateToProps, mapDispatchToProps } from 'components/menu/subcomponents/search-box-dropdown/search-box-dropdown.container'

jest.mock('connected-react-router')
jest.mock('actions/hide-search-dropdown')
jest.mock('actions/update-search-params')
jest.mock('utils/url-parsing')

const props = {
  searchDropdown: 'test-search-dropdown',
}

const dispatch = jest.fn()

// helper function to test `onSubmit` function dispatches correct action based off section
const testOnSubmit = ({ section, query, action, expected }) => {
  getSection.mockImplementation(() => section)
  mapDispatchToProps(dispatch).onSubmit(query)
  expect(dispatch).toBeCalled()
  expect(action).toBeCalledWith(expected)
}

describe('containers - Menu - SearchBoxDropdown', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    describe('hideSearchDropdown', () => {
      it('should dispatch the `hideSearchDropdown` action', () => {
        mapDispatchToProps(dispatch).hideSearchDropdown()
        expect(dispatch).toBeCalled()
        expect(hideSearchDropdown).toBeCalled()
      })
    })

    describe('onSubmit', () => {
      it('should dispatch the `hideSearchDropdown` action', () => {
        mapDispatchToProps(dispatch).onSubmit('test-query')
        expect(dispatch).toBeCalled()
        expect(hideSearchDropdown).toBeCalled()
      })

      describe('section is `search`', () => {
        it('should dispatch the `updateSearchParams` action with the correct params', () => {
          const expected = { page: 1, query: 'test-query', filters: [] }
          testOnSubmit({ section: 'search', query: 'test-query', action: updateSearchParams, expected })
        })
      })

      describe('section is not `search`', () => {
        it('should dispatch the `updateSearchParams` action with the correct params', () => {
          const expected = { page: 1, query: 'test-query', size: 10, sort: 'best_match', filters: [] }
          testOnSubmit({ section: 'not-search', query: 'test-query', action: updateSearchParams, expected })
        })

        it('should dispatch the action to `push` to the correct page', () => {
          const expected = `/search?page=1&query=test-query&size=10&sort=best_match`
          testOnSubmit({ section: 'not-search', query: 'test-query', action: push, expected })
        })
      })
    })
  })
})
