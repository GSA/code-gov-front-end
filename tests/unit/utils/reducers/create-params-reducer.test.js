import cloneDeep from 'lodash.clonedeep'

import { now } from 'utils/other'
import { testReducerCommon } from 'testUtils/reducer'
import createParamsReducer from 'utils/reducers/create-params-reducer'

const PAGE = 'TEST-PAGE'
const initialState = {
  other: 'stuff',
  page: 2,
  filters: [
    { category: 'ca-1', value: 'va-1', modified: now() },
    { category: 'ca-1', value: 'va-2', modified: now() },
    { category: 'ca-2', value: 'va-1', modified: now() },
  ],
  query: 'test-query',
  nested: {
    value: '123',
  },
}

const reducer = createParamsReducer(PAGE)

let state
describe('utils - create-params-reducer', () => {
  beforeEach(() => {
    state = cloneDeep(initialState)
  })

  testReducerCommon(reducer)

  describe('`UPDATE_${PAGE}_FILTERS` case', () => {
    it('should reset the `page` to 1', () => {
      const action = { type: `UPDATE_${PAGE}_FILTERS`, category: '', value: '', intent: '' }
      const expected = { ...initialState, page: 1 }
      expect(reducer(state, action)).toEqual(expected)
    })

    it('should remove the filter if the `intent` is `remove`', () => {
      const action = {
        type: `UPDATE_${PAGE}_FILTERS`,
        category: 'CA-1',
        value: 'VA-2',
        intent: 'remove',
      }
      const expected = {
        ...initialState,
        filters: [
          { category: 'ca-1', value: 'va-1', modified: now() },
          { category: 'ca-2', value: 'va-1', modified: now() },
        ],
        page: 1,
      }

      const newState = reducer(state, action)
      expect(newState).toEqual(expected)
    })

    it('should add the filter if the `intent` is `add`', () => {
      const action = {
        type: `UPDATE_${PAGE}_FILTERS`,
        category: 'ca-1',
        value: 'va-3',
        intent: 'add',
      }
      const expected = {
        ...initialState,
        filters: [
          ...initialState.filters,
          { category: 'ca-1', value: 'va-3', modified: now() },
        ],
        page: 1,
      }

      const newState = reducer(state, action)
      expect(newState).toEqual(expected)
    })
  })

  describe('`UPDATE_${PAGE}_PARAMS` case', () => {
    it('should merge the `data` into state', () => {
      const action = {
        type: `UPDATE_${PAGE}_PARAMS`,
        data: {
          query: 'new-query',
          nested: {
            value: 'new-nested-value',
          },
        }
      }
      const expected = {
        ...initialState,
        query: 'new-query',
        nested: {
          value: 'new-nested-value',
        },
      }

      const newState = reducer(state, action)
      expect(newState).toEqual(expected)
    })

    it('should fall back to an empty object if `state` not defined', () => {
      const action = { type: `UPDATE_${PAGE}_PARAMS`, data: { test: 'value' } }
      expect(reducer(undefined, action)).toEqual({ test: 'value' })
    })
  })
})