import saveFilterOptions from 'actions/save-filter-options'
import updateSearchFilters from 'actions/update-search-filters'
import updateSearchParams from 'actions/update-search-params'
import * as otherUtils from 'utils/other'
import { mapStateToProps, mapDispatchToProps } from 'components/search-page/search-page.container'

jest.mock('actions/save-filter-options')
jest.mock('actions/update-search-filters')
jest.mock('actions/update-search-params')

const props = {
  searchParams: {
    query: 'test-query',
    page: 'test-page',
    sort: 'test-sort',
    size: 'test-size',
    filters: [
      { category: 'agencies', value: 'ag-0-value', modified: otherUtils.now() },
      { category: 'agencies', value: 'ag-2-value', modified: otherUtils.now() },
      { category: 'languages', value: 'la-1-value', modified: otherUtils.now() },
    ],
  },
  searchResults: {
    total: 2,
    repos: [
      {
        repoId: 'repo-1',
        agency: { acronym: 'ag-1-value' },
        languages: ['la-1-value', 'la-1-value'],
        permissions: {
          licenses: [{ name: 'li-1-value' }],
          usageType: 'us-1-value',
        },
      }, {
        repoId: 'repo-2',
        agency: { acronym: 'ag-2-value' },
        languages: ['la-2-value', 'la-2-value'],
        permissions: {
          licenses: [{ name: 'li-2-value' }],
          usageType: 'us-2-value',
        },
      }
    ],
  },
  filters: {
    agencies: [
      { name: 'ag-1-name', value: 'ag-1-value' },
      { name: 'ag-2-name', value: 'ag-2-value' },
    ],
    languages: [
      { name: 'la-1-name', value: 'la-1-value' },
    ],
    licenses: [],
    usageTypes: [],
  }
}

const dispatch = jest.fn()

describe('containers - SearchPage', () => {
  describe('mapStateToProps', () => {
    it('should map `boxes` based off `filters`, checked if a matching browseParam filter value', () => {
      const actual = mapStateToProps(props).boxes
      const expected = {
        agencies: [
          { name: 'ag-1-name', value: 'ag-1-value', checked: false }, // no matching searchParams.filters value for 'ag-1-value'
          { name: 'ag-2-name', value: 'ag-2-value', checked: true },
        ],
        languages: [
          { name: 'la-1-name', value: 'la-1-value', checked: true },
        ],
        licenses: [],
        usageTypes: [],
      }
      expect(actual).toEqual(expected)
    })

    it('should map no `boxes` if no filters provided', () => {
      expect(mapStateToProps({ ...props, filters: undefined }).boxes).toEqual({})
    })

    it.each`
      selected
      ${'best_match'}
      ${'data_quality'}
      ${'a-z'}
      ${'last_updated'}
    `('should set the `sortOptions` value as $selected when selected', ({ selected }) => {
      const { sortOptions } = mapStateToProps({
        ...props,
        searchParams: { ...props.searchParams, sort: selected },
      })
      expect(sortOptions.find(x => x.selected).value).toBe(selected)
    })

    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    describe('onFilterBoxChange', () => {
      it('should dispatch the `updateSearchFilters` action with the correct params', () => {
        const change = { value: 123, type: 'test-type' }
        mapDispatchToProps(dispatch).onFilterBoxChange('category', change)
        expect(dispatch).toBeCalled()
        expect(updateSearchFilters).toBeCalledWith('category', change.value, change.type)
      })
    })

    describe('onFilterTagClick', () => {
      it('should dispatch the `updateSearchFilters` action with the correct params', () => {
        mapDispatchToProps(dispatch).onFilterTagClick('category', 'value')
        expect(dispatch).toBeCalled()
        expect(updateSearchFilters).toBeCalledWith('category', 'value', 'removed')
      })
    })

    describe('onSortChange', () => {
      it('should dispatch the `updateSearchParams` action with the correct params', () => {
        mapDispatchToProps(dispatch).onSortChange('value')
        expect(dispatch).toBeCalled()
        expect(updateSearchParams).toBeCalledWith({ page: 1, sort: 'value' })
      })
    })

    describe('saveFilterData', () => {
      it('should dispatch the `saveFilterOptions` action', () => {
        mapDispatchToProps(dispatch).saveFilterData()
        expect(dispatch).toBeCalled()
        expect(saveFilterOptions).toBeCalled()
      })
    })

    describe('updatePage', () => {
      it('should dispatch the `updateSearchParams` action', () => {
        mapDispatchToProps(dispatch).updatePage(123)
        expect(dispatch).toBeCalled()
        expect(updateSearchParams).toBeCalledWith({ page: 123 })
      })
    })
  })
})
