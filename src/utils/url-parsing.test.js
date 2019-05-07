import { push } from 'mocks/window'
import {
  getURLSearchParamsAsSimpleObj,
  convertObjToSortedSearchString,
  getParamAsArray,
  getParamAsNumber,
  getParamAsString,
  getNormalizedURLSearchParams,
  getSearchFromUrl,
  getSection,
} from 'utils/url-parsing'

describe('utils - url-parsing', () => {
  describe('getURLSearchParamsAsSimpleObj', () => {
    it('should return an object of decoded values', () => {
      const search = '?a=123&b=test%2Cvalue&c=test%20space&other' // %2C = comma, %20 = space
      const expected = { a: '123', b: 'test,value', c: 'test space' }
      expect(getURLSearchParamsAsSimpleObj(search)).toEqual(expected)
    })

    it('should return an empty object for non string values', () => {
      expect(getURLSearchParamsAsSimpleObj({ test: 'value' })).toEqual({})
      expect(getURLSearchParamsAsSimpleObj(['test-array'])).toEqual({})
    })
  })

  describe('convertObjToSortedSearchString', () => {
    it('should convert an object to a sorted uri encoded search string', () => {
      const obj = { b: 'test', a: '123', c: 'test space' }
      const expected = '&a=123&b=test&c=test%20space' // %20 = encoded space
      expect(convertObjToSortedSearchString(obj)).toEqual(expected)
    })

    it('should return array values as encoded, comma seperated, sorted values', () => {
      const obj = { a: [ 'a', 'c', 'b' ] }
      const expected = '&a=a%2Cb%2Cc' // %2C = encoded comma
      expect(convertObjToSortedSearchString(obj)).toEqual(expected)
    })
  })

  describe('getParamAsArray', () => {
    it('should return trimmed values as an array', () => {
      const params = { a: ' test-1, test-2  ,test 3' }
      expect(getParamAsArray(params, 'a')).toEqual(['test-1', 'test-2', 'test 3'])
    })

    it('should return falsy if no value found', () => {
      expect(getParamAsArray({}, 'a')).toBeFalsy()
    })
  })

  describe('getParamAsNumber', () => {
    it('should return trimmed values as a number', () => {
      const params = { a: ' 1   ', b: '2' }
      expect(getParamAsNumber(params, 'a')).toEqual(1)
      expect(getParamAsNumber(params, 'b')).toEqual(2)
    })

    it('should return falsy if no value found', () => {
      expect(getParamAsNumber({}, 'a')).toBeFalsy()
    })
  })

  describe('getParamAsString', () => {
    it('should return trimmed values', () => {
      const params = { a: ' 1   ', b: 'test value' }
      expect(getParamAsString(params, 'a')).toEqual('1')
      expect(getParamAsString(params, 'b')).toEqual('test value')
    })

    it('should return falsy if no value found', () => {
      expect(getParamAsString({}, 'a')).toBeFalsy()
    })
  })

  describe('getNormalizedURLSearchParams', () => {
    it('should return normalized values as an object', () => {
      const search = `
        ?agencies=ag-1%2Cag-2
        &languages=la-1%2Cla-2
        &licenses=li-1%2Cli-2
        &skillLevels=  sk-1  %2Csk-2
        &timeRequired=ti-1  %2Cti-2
        &usageType=  us-1%2Cus-2
        &page=3
        &sort=desc
        &query=test%20query
      `.trim() // %2C = comma, %20 = space

      const expected = {
        agencies: ['ag-1', 'ag-2'],
        languages: ['la-1', 'la-2'],
        licenses: ['li-1', 'li-2'],
        skillLevels: ['sk-1', 'sk-2'],
        timeRequired: ['ti-1', 'ti-2'],
        usageType: ['us-1', 'us-2'],
        page: 3,
        sort: 'desc',
        query: 'test query',
      }

      expect(getNormalizedURLSearchParams(search)).toEqual(expected)
    })

    it('should use `window.location.search` if no params provided', () => {
      push('/test?page=1')
      expect(getNormalizedURLSearchParams().page).toBe(1)
    })
  })

  describe('getSearchFromUrl', () => {
    it('should return the search string from a url', () => {
      expect(getSearchFromUrl('http://test.com?a=123&b=test')).toEqual('?a=123&b=test')
    })

    it('should return falsy if no search string found', () => {
      expect(getSearchFromUrl('http://test.com#a=123&b=test')).toBeFalsy()
    })
  })

  describe('getSection', () => {
    it('should return `browse` if the pathname includes `/browse-projects`', () => {
      push('http://test.com/browse-projects?a=123&b=test')
      expect(getSection()).toEqual('browse')
      push('/browse-projects/test-url.png')
      expect(getSection()).toEqual('browse')
    })

    it('should return `search` if the pathname includes `/search`', () => {
      push('http://test.com/search?a=123&b=test')
      expect(getSection()).toEqual('search')
      push('/search/test-url.png')
      expect(getSection()).toEqual('search')
    })

    it('should return `tasks` if the pathname includes `/open-tasks`', () => {
      push('http://test.com/open-tasks?a=123&b=test')
      expect(getSection()).toEqual('tasks')
      push('/open-tasks/test-url.png')
      expect(getSection()).toEqual('tasks')
    })

    it('should return `project` if the pathname includes `/projects/`', () => {
      push('http://test.com/projects/project-1?a=123&b=test')
      expect(getSection()).toEqual('project')
      push('/projects/test-url.png')
      expect(getSection()).toEqual('project')
    })

    it('should return falsy for unmatched pathnames', () => {
      push('http://test.com/no-match?a=123&b=test')
      expect(getSection()).toBeFalsy()
    })
  })
})