import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateBrowseParams from 'actions/update-browse-params'
import * as otherUtils from 'utils/other'
import { mapStateToProps, mapDispatchToProps } from 'components/browse-projects/browse-projects.container'

jest.mock('actions/save-filter-options')
jest.mock('actions/update-browse-filters')
jest.mock('actions/update-browse-params')

const props = {
  browseParams: {
    page: 'test-page',
    sort: 'test-sort',
    size: 'test-size',
    filters: [
      { category: 'agencies', value: 'v0', modified: otherUtils.now() },
      { category: 'agencies', value: 'v2', modified: otherUtils.now() },
      { category: 'languages', value: 'v3', modified: otherUtils.now() },
    ],
  },
  browseResults: {
    total: 2,
    repos: [{ repoId: 'repo-1' }, { repoId: 'repo-2' }],
  },
  filters: {
    agencies: [
      { name: 'a1', value: 'v1' },
      { name: 'a2', value: 'v2' },
    ],
    languages: [
      { name: 'l1', value: 'v3' },
    ],
    licenses: [],
    usageTypes: [],
  }
}

const dispatch = jest.fn()

describe('containers - BrowseProjects', () => {
  describe('mapStateToProps', () => {
    it('should map `boxes` based off `filters`, checked if a matching browseParam filter value', () => {
      const actual = mapStateToProps(props).boxes
      const expected = {
        agencies: [
          { name: 'a1', value: 'v1', checked: false }, // no matching browseParams value fpor 'v1'
          { name: 'a2', value: 'v2', checked: true },
        ],
        languages: [
          { name: 'l1', value: 'v3', checked: true },
        ],
        licenses: [],
        usageTypes: [],
      }
      expect(actual).toEqual(expected)
    })

    it('should map no `boxes` if no filters provided', () => {
      expect(mapStateToProps({ ...props, filters: undefined }).boxes).toEqual({})
    })

    it('should map `filterTags` based off `browseParams` and `filters`', () => {
      jest.spyOn(otherUtils, 'getFilterTags')
      mapStateToProps(props)
      expect(otherUtils.getFilterTags).toBeCalledWith(props.browseParams, props.filters)
    })

    it.each`
      selected
      ${'data_quality'}
      ${'a-z'}
      ${'last_updated'}
    `('should set the `sortOptions` value as $selected when selected', ({ selected }) => {
      const { sortOptions } = mapStateToProps({
        ...props,
        browseParams: { ...props.browseParams, sort: selected },
      })
      expect(sortOptions.find(x => x.selected).value).toBe(selected)
    })

    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })

    it('should default to 0 `total` if none provided in `browseResults`', () => {
      const newBrowseResults = { ...props.browseResults, total: undefined }
      expect(mapStateToProps({ ...props, browseResults: newBrowseResults }).total).toBe(0)
    })
  })

  describe('mapDispatchToProps', () => {
    describe('onFilterBoxChange', () => {
      it('should dispatch the `updateBrowseFilters` action with the correct params', () => {
        const change = { value: 123, type: 'test-type' }
        mapDispatchToProps(dispatch).onFilterBoxChange('category', change)
        expect(dispatch).toBeCalled()
        expect(updateBrowseFilters).toBeCalledWith('category', change.value, change.type)
      })
    })

    describe('onFilterTagClick', () => {
      it('should dispatch the `updateBrowseFilters` action with the correct params', () => {
        mapDispatchToProps(dispatch).onFilterTagClick('category', 'value')
        expect(dispatch).toBeCalled()
        expect(updateBrowseFilters).toBeCalledWith('category', 'value', 'remove')
      })
    })

    describe('onSortChange', () => {
      it('should dispatch the `updateBrowseParams` action with the correct params', () => {
        mapDispatchToProps(dispatch).onSortChange('value')
        expect(dispatch).toBeCalled()
        expect(updateBrowseParams).toBeCalledWith({ page: 1, sort: 'value' })
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
      it('should dispatch the `updateBrowseParams` action', () => {
        mapDispatchToProps(dispatch).updatePage(123)
        expect(dispatch).toBeCalled()
        expect(updateBrowseParams).toBeCalledWith({ page: 123 })
      })
    })
  })
})
