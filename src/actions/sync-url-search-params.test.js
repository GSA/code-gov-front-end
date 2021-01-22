import { push } from 'connected-react-router'

import { push as pushPath } from 'mocks/window'
import syncUrlSearchParams from 'actions/sync-url-search-params'

jest.mock('connected-react-router')

const params = {
  filters: [
    { category: 'ca-1', value: 'va-1' },
    { category: 'ca-2', value: 'va-2' },
    { category: 'ca-2', value: 'va-3' }
  ],
  number: 123,
  string: 'test-string',
  ignored: { test: 'value' }
}
const paramsAsSearch = '&ca-1=va-1&ca-2=va-2%2Cva-3&number=123&string=test-string'
const state = {
  browseParams: params,
  searchParams: params,
  taskParams: params
}

const dispatch = jest.fn()

describe('actions - sync-url-search-params', () => {
  it('should return a function (thunk)', () => {
    expect(typeof syncUrlSearchParams(state)).toBe('function')
  })

  describe('on `/browse-projects` route', () => {
    beforeEach(() => {
      pushPath('/browse-projects')
    })

    it('should not dispatch any actions if `browseParams` are not in state', async () => {
      await syncUrlSearchParams({ ...state, browseParams: undefined })(dispatch)
      expect(dispatch).not.toBeCalled()
    })

    it('should `push` with the new search params from state', async () => {
      pushPath('/browse-projects?a=123&b=test')
      await syncUrlSearchParams(state)(dispatch)
      expect(push).toBeCalledWith(`/browse-projects?${paramsAsSearch}`)
    })
  })

  describe('on `/search` route', () => {
    beforeEach(() => {
      pushPath('/search')
    })

    it('should not dispatch any actions if `searchParams` are not in state', async () => {
      await syncUrlSearchParams({ ...state, searchParams: undefined })(dispatch)
      expect(dispatch).not.toBeCalled()
    })

    it('should dispatch the `push` action with the new url', async () => {
      await syncUrlSearchParams(state)(dispatch)
      expect(dispatch).toBeCalled()
      expect(push).toBeCalledWith('/search')
    })

    it('should `push` with the new search params from state', async () => {
      pushPath('/search?a=123&b=test')
      await syncUrlSearchParams(state)(dispatch)
      expect(push).toBeCalledWith(`/search?${paramsAsSearch}`)
    })
  })

  describe('on other route', () => {
    beforeEach(() => {
      pushPath('/other-route')
    })

    it('should not dispatch any actions', async () => {
      await syncUrlSearchParams(state)(dispatch)
      expect(dispatch).not.toBeCalled()
    })
  })
})
