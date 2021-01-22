import pick from 'lodash.pick'

import updateSearchParams from 'actions/update-search-params'
import updateTaskParams from 'actions/update-task-params'
import { getNormalizedURLSearchParams, getSection } from 'utils/url-parsing'
import { now } from 'utils/other'
import defaultState from 'constants/default-redux-store-state'
import { mapDispatchToProps } from 'components/app/app.container'

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
  query: 'test-query'
}

// filters that get mapped out from `searchParams`
const filters = [
  { category: 'agencies', value: 'a1', modified: now() },
  { category: 'agencies', value: 'a2', modified: now() },
  { category: 'languages', value: 'l1', modified: now() }
]

const dispatch = jest.fn()

// helper function for testing `rehydrate` dispatches an action with expected params
const testBySection = ({ section, action, expected }) => {
  getSection.mockImplementation(() => section)
  mapDispatchToProps(dispatch).rehydrate()
  expect(dispatch).toBeCalled()
  expect(action).toBeCalledWith(expected)
}

describe('containers - App', () => {
  beforeEach(() => {
    getNormalizedURLSearchParams.mockImplementation(() => searchParams)
  })

  describe('mapDispatchToProps', () => {
    describe('section is `search`', () => {
      it('should dispatch the `updateTaskParams` action with the correct params', () => {
        const expected = { ...pick(searchParams, ['page', 'query', 'sort', 'size']), filters }
        testBySection({ section: 'search', action: updateTaskParams, expected })
      })

      it('should dispatch the `updateTaskParams` action with the default search params if none provided', () => {
        const expected = pick(defaultState.searchParams, [
          'page',
          'query',
          'sort',
          'size',
          'filters'
        ])
        getNormalizedURLSearchParams.mockImplementation(() => ({}))
        testBySection({ section: 'search', action: updateTaskParams, expected })
      })
    })

    describe('section is `tasks`', () => {
      it('should dispatch the `updateTaskParams` action with the correct params if the section is `tasks`', () => {
        const expected = { ...pick(searchParams, ['page', 'size']), filters }
        testBySection({ section: 'tasks', action: updateTaskParams, expected })
      })

      it('should dispatch the `updateTaskParams` action with the default task params if none provided', () => {
        const expected = pick(defaultState.taskParams, ['page', 'query', 'sort', 'size', 'filters'])
        getNormalizedURLSearchParams.mockImplementation(() => ({}))
        testBySection({ section: 'tasks', action: updateTaskParams, expected })
      })
    })

    describe('section is unknown or undefined', () => {
      it('should not dispatch any actions', () => {
        getSection.mockImplementation(() => 'unknown')
        mapDispatchToProps(dispatch).rehydrate()
        expect(dispatch).not.toBeCalled()

        getSection.mockImplementation(() => undefined)
        mapDispatchToProps(dispatch).rehydrate()
        expect(dispatch).not.toBeCalled()
      })
    })
  })
})
