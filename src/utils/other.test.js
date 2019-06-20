import {
  falses,
  isFalse,
  adjustAssetPath,
  getConfigValue,
  normalize,
  setScrollDepth,
  refreshView,
  getSet,
  getLowerSet,
  hasLicense,
  now,
  getFilterValuesFromParamsByCategory,
  getFilterTags,
  fillFilters,
  onHomePage
} from 'utils/other'

const restore = { ...global }

describe('other util', () => {
  afterEach(() => {
    SITE_CONFIG = restore.SITE_CONFIG
  })

  describe('isFalse', () => {
    it('should be truthy for false values', () => {
      const allFalse = falses.every(x => isFalse(x))
      expect(allFalse).toBeTruthy()
    })

    it('should be falsy for truthful values', () => {
      expect(isFalse(true)).toBeFalsy()
      expect(isFalse('truthful string')).toBeFalsy()
    })
  })

  describe('adjustAssetPath', () => {
    it('should prefix paths starting with `assets` with the `PUBLIC_PATH`', () => {
      expect(adjustAssetPath('./assets/test')).toBe(`${PUBLIC_PATH}assets/test`)
      expect(adjustAssetPath('/assets/test')).toBe(`${PUBLIC_PATH}assets/test`)
      expect(adjustAssetPath('assets/test')).toBe(`${PUBLIC_PATH}assets/test`)
    })

    it('should return paths not starting with `assets` unaltered', () => {
      expect(adjustAssetPath('./other-path/test')).toBe('./other-path/test')
    })
  })

  describe('getConfigValue', () => {
    it('should catch errors while adjusting the asset path', () => {
      // is the try / catch even needed?
    })

    it('should return the adjusted path of config values that are array`s of objects', () => {
      const { logos } = SITE_CONFIG.content.footer
      const adjustedValues = logos.map(logo => ({
        ...logo,
        image: PUBLIC_PATH + logo.image.replace(/.?\/?assets\//, 'assets/')
      }))
      expect(getConfigValue('content.footer.logos')).toEqual(adjustedValues)
    })

    it('should log a warning if no value was found', () => {
      getConfigValue('not a valid value')
      expect(console.warn).toBeCalled()
    })

    it('should return a falsey value if `SITE_CONFIG` is not set', () => {
      SITE_CONFIG = undefined
      expect(getConfigValue('content.home.press.quote')).toBeFalsy()
    })
  })

  describe('normalize', () => {
    it('should trim and lowercase values', () => {
      expect(normalize('  TesTing    ')).toBe('testing')
      expect(normalize('test')).toBe('test')
    })

    it('should leave non string values as is', () => {
      expect(normalize(123)).toBe(123)
      expect(normalize(undefined)).toBe(undefined)
    })
  })

  describe('setScrollDepth', () => {
    it('should set the documentElement`s scrollTop as the provided value', () => {
      document.documentElement.scrollTop = 999
      setScrollDepth(123)
      expect(document.documentElement.scrollTop).toBe(123)
    })

    it('should not set the documentElement`s scrollTop if it falsy', () => {
      document.documentElement.scrollTop = 0
      setScrollDepth(123)
      expect(document.documentElement.scrollTop).toBe(0)
    })

    it('should set the body`s scrollTop as the provided value', () => {
      document.body.scrollTop = 999
      setScrollDepth(123)
      expect(document.body.scrollTop).toBe(123)
    })

    it('should not set the body`s scrollTop if it falsy', () => {
      document.body.scrollTop = 0
      setScrollDepth(123)
      expect(document.body.scrollTop).toBe(0)
    })
  })

  describe('refreshView', () => {
    it('should scroll to the top', () => {
      refreshView()
      expect(window.scrollTo).toBeCalledWith(0, 0)
    })

    it('should blur the active element', () => {
      jest.spyOn(document.activeElement, 'blur')
      refreshView()
      expect(document.activeElement.blur).toBeCalled()
    })
  })

  describe('getSet', () => {
    it('should create a set of truthy items based off the path provided', () => {
      const items = [{ a: { b: '' } }, { a: { b: 'aBc' } }, { a: { b: 'true' } }]
      const results = new Set(['aBc', 'true'])
      expect(getSet(items, 'a.b')).toEqual(new Set(results))
    })

    it('should map out truthy array values', () => {
      const items = [{ a: { b: [] } }, { a: { b: ['123', 'Test'] } }, { a: { b: ['false', ''] } }]
      const results = new Set(['123', 'Test'])
      expect(getSet(items, 'a.b')).toEqual(new Set(results))
    })

    it('should return an empty set if the items are not an array', () => {
      expect(getSet('string of items', 'path')).toEqual(new Set())
    })

    it('should return an empty set if the path is not a string', () => {
      const items = [{ a: '1' }, { a: '2' }]
      expect(getSet(items, {})).toEqual(new Set())
    })
  })

  describe('getLowerSet', () => {
    it('should create a lowercase set of truthy items based off the path provided', () => {
      const items = [{ a: { b: '' } }, { a: { b: 'aBc' } }, { a: { b: 'true' } }]
      const results = new Set(['abc', 'true'])
      expect(getLowerSet(items, 'a.b')).toEqual(new Set(results))
    })

    it('should map out truthy array values lowercased', () => {
      const items = [{ a: { b: [] } }, { a: { b: ['123', 'Test'] } }, { a: { b: ['false', ''] } }]
      const results = new Set(['123', 'test'])
      expect(getLowerSet(items, 'a.b')).toEqual(new Set(results))
    })

    it('should return an empty set if the items are not an array', () => {
      expect(getLowerSet('string of items', 'path')).toEqual(new Set())
    })

    it('should return an empty set if the path is not a string', () => {
      const items = [{ a: '1' }, { a: '2' }]
      expect(getLowerSet(items, {})).toEqual(new Set())
    })
  })

  describe('hasLicense', () => {
    it('should return falsy if no permissions', () => {
      expect(hasLicense({})).toBeFalsy()
    })

    it('should return falsy if invalid or empty licenses', () => {
      expect(hasLicense({ permissions: { licenses: 'not array' } })).toBeFalsy()
      expect(hasLicense({ permissions: { licenses: [] } })).toBeFalsy()
    })

    it('should return truthy if licenses exist', () => {
      expect(hasLicense({ permissions: { licenses: ['l1', 'l2'] } })).toBeTruthy()
    })
  })

  describe('now', () => {
    it('should return a number format date', () => {
      expect(now()).not.toBeNaN()
      expect(new Date(now()).getDate()).not.toBeNaN()
    })
  })

  describe('getFilterValuesFromParamsByCategory', () => {
    it('should map values of entries based off the category passed', () => {
      const params = {
        filters: [
          { category: 'a', value: 'v1' },
          { category: 'b', value: 'v2' },
          { category: 'a', value: 'v3' }
        ]
      }
      expect(getFilterValuesFromParamsByCategory(params, 'a')).toEqual(['v1', 'v3'])
    })

    it('should trim and lowercase values', () => {
      const params = {
        filters: [{ category: 'a', value: '  V1  ' }, { category: 'a', value: true }]
      }
      expect(getFilterValuesFromParamsByCategory(params, 'a')).toEqual(['v1', true])
    })
  })

  describe('getFilterTags', () => {
    it('should map and sort filters based off if they are found', () => {
      const params = {
        filters: [
          { category: 'a', modified: 111, value: 'V1' },
          { category: 'b', modified: 444, value: 'v2' },
          { category: 'a', modified: 333, value: 'v3' },
          { category: 'c', modified: 222, value: 'v4' }
        ]
      }
      const filters = {
        a: [{ name: 'a1', value: 'v1' }, { name: 'a2', value: 'v3' }],
        b: [{ name: 'b1', value: 'v2' }]
      }
      const result = [
        { category: 'a', modified: 111, value: 'v1', title: 'a1' },
        { category: 'c', modified: 222, value: 'v4', title: 'loading' },
        { category: 'a', modified: 333, value: 'v3', title: 'a2' },
        { category: 'b', modified: 444, value: 'v2', title: 'b1' }
      ]
      expect(getFilterTags(params, filters)).toEqual(result)
    })
  })

  describe('fillFilters', () => {
    it('should fill the result`s filters based off params that are arrays', () => {
      const keys = ['a', 'b', 'c']
      const params = {
        a: [1, 2, 3],
        b: [],
        c: 'not array'
      }
      const result = {
        filters: [{ category: 'a', modified: 111, value: 'V1' }]
      }

      fillFilters(keys, params, result)
      expect(result.filters.length).toEqual(4)
      expect(result.filters.every(x => x.category === 'a')).toBeTruthy()
    })
  })

  describe('onHomePage', () => {
    it('should return truthy if the pathname is the `PUBLIC_PATH`', () => {
      window.history.replaceState('', '', PUBLIC_PATH)
      expect(onHomePage()).toBeTruthy()
    })

    it('should return falsy if the pathname is not the `PUBLIC_PATH`', () => {
      window.history.replaceState('', '', '/test-path')
      expect(onHomePage()).toBeFalsy()
    })
  })
})
