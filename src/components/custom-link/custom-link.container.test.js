import pick from 'lodash.pick'

import updateBrowseParams from 'actions/update-browse-params'
import updateSearchParams from 'actions/update-search-params'
import updateTaskParams from 'actions/update-task-params'
import { getNormalizedURLSearchParams } from 'utils/url-parsing'
import { now } from 'utils/other'
import defaultState from 'constants/default-redux-store-state'
import { mapDispatchToProps } from 'components/custom-link/custom-link.container'

jest.mock('actions/update-browse-params')
jest.mock('actions/update-search-params')
jest.mock('actions/update-task-params')
jest.mock('utils/url-parsing')

const searchParams = {
  agencies: ['a1', 'a2'],
  languages: ['l1'],
  page: 'test-page',
  sort: 'test-sort',
  size: 'test-size',
  query: 'test-query',
}

// filters that get mapped out from `searchParams`
const filters =  [
  { category: 'agencies', value: 'a1', modified: now() },
  { category: 'agencies', value: 'a2', modified: now() },
  { category: 'languages', value: 'l1', modified: now() },
]

const dispatch = jest.fn()

// helper function for testing `updateStore` dispatches an action with expected params
const testByTo = ({ to, action, expected }) => {
  mapDispatchToProps(dispatch).updateStore(to)
  expect(dispatch).toBeCalled()
  expect(action).toBeCalledWith(expected)
}

describe('containers - CustomLink', () => {
  beforeEach(() => {
    getNormalizedURLSearchParams.mockImplementation(() => searchParams)
  })

  describe('mapDispatchToProps', () => {
    describe('updateStore', () => {
      describe('`to` starts with `/browse`', () => {
        it('should dispatch the `updateBrowseParams` with the correct params', () => {
          const expected = { ...pick(searchParams, ['page', 'size', 'sort']), filters }
          testByTo({ to: '/browse/test', action: updateBrowseParams, expected })
        })

        it('should dispatch the `updateBrowseParams` with the default browse params if none provided', () => {
          getNormalizedURLSearchParams.mockImplementation(() => ({}))
          const expected = pick(defaultState.browseParams, ['page', 'size', 'sort', 'filters'])
          testByTo({ to: '/browse/test', action: updateBrowseParams, expected })
        })
      })

      describe('`to` starts with `/search`', () => {
        it('should dispatch the `updateSearchParams` with the correct params', () => {
          const expected = { ...pick(searchParams, ['page', 'query', 'size', 'sort']), filters }
          testByTo({ to: '/search/test', action: updateSearchParams, expected })
        })

        it('should dispatch the `updateSearchParams` with the default search params if none provided', () => {
          getNormalizedURLSearchParams.mockImplementation(() => ({}))
          const expected = pick(defaultState.searchParams, ['page', 'query', 'size', 'sort', 'filters'])
          testByTo({ to: '/search/test', action: updateSearchParams, expected })
        })
      })

      describe('`to` starts with `/open-tasks`', () => {
        it('should dispatch the `updateTaskParams` with the correct params', () => {
          const expected = { ...pick(searchParams, ['page', 'size']), filters }
          testByTo({ to: '/open-tasks/test', action: updateTaskParams, expected })
        })

        it('should dispatch the `updateTaskParams` with the default browse params if none provided', () => {
          getNormalizedURLSearchParams.mockImplementation(() => ({}))
          const expected = pick(defaultState.browseParams, ['page', 'size', 'filters'])
          testByTo({ to: '/open-tasks/test', action: updateTaskParams, expected })
        })
      })

      describe('`to` does not match any case', () => {
        it('should not take any action', () => {
          const to = '/unknown-to/test-to?a=123'
          mapDispatchToProps(dispatch).updateStore(to)
          expect(dispatch).not.toBeCalled()
        })
      })
    })
  })
})
