import pick from 'lodash.pick'
import assign from 'lodash.assign'
import { getNormalizedURLSearchParams, getSection } from 'utils/url-parsing'
import { now } from 'utils/other'
import defaultState from 'constants/default-redux-store-state'
import mapping from 'constants/url-param-to-store'
import { hydrate } from 'hydrator'

jest.mock('utils/url-parsing')

const values = {
  page: 123,
  query: 'test-query',
  size: 456,
  sort: 'test-sort'
}

const filters = {
  agencies: ['agency-1', 'agency-2'],
  languages: ['lang-1'],
  skillLevels: [],
  timeRequired: ['time-1', 'time-2', 'time-3'],
  licenses: ['lic-1', 'lic-2'],
  usageTypes: ['usage-1']
}

// setup mocking getting the section and url params
const setup = (section, params) => {
  getSection.mockImplementation(() => section)
  getNormalizedURLSearchParams.mockImplementation(() => params)
}

// get mapped out expected filters
/* eslint-disable */
const getMappedFilters = params =>
  Object.keys(params).reduce((filters, category) => {
    filters.push(...params[category].map(value => ({ category, value, modified: now() })))
    return filters
    /* eslint-enable */
  }, [])

describe('hydrator', () => {
  describe('hydrate', () => {
    it('should update values in state', () => {
      const params = pick(values, Object.keys(mapping.search))
      const expected = { ...defaultState.searchParams, ...params }
      setup('search', params)
      expect(hydrate().searchParams).toEqual(expected)
    })

    it('should update filters in state', () => {
      let params = pick(filters, Object.keys(mapping.tasks))
      let expected = getMappedFilters(params)
      setup('tasks', params)
      expect(hydrate().taskParams.filters).toEqual(expected)

      // test browse aswell to cover all possible keys
      params = pick(filters, Object.keys(mapping.browse))
      expected = getMappedFilters(params)
      setup('browse', params)
      expect(hydrate().browseParams.filters).toEqual(expected)
    })

    it('should not update falsy or values or unknown keys', () => {
      const params = { page: 0, sort: '', test: 'should not exist' }
      setup('tasks', params)
      expect(hydrate()).toEqual(defaultState)
    })

    it('should return the default state if no section found', () => {
      setup(undefined, undefined)
      expect(hydrate()).toEqual(defaultState)
    })
  })
})
