import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateBrowseParams from 'actions/update-browse-params'
import { getNormalizedURLSearchParams, getSection } from 'utils/url-parsing';
import * as otherUtils from 'utils/other';
import { mapStateToProps, mapDispatchToProps } from 'components/browse-projects/browse-projects.container.js';

jest.mock('actions/save-filter-options');
jest.mock('actions/update-browse-filters');
jest.mock('actions/update-browse-params');
otherUtils.now = () => 123; // mock date to be consistent

const browseParams = {
  page: 'test-page',
  sort: 'test-sort',
  size: 'test-size',
  filters: [
    { category: 'agencies', value: 'v0', modified: otherUtils.now() },
    { category: 'agencies', value: 'v2', modified: otherUtils.now() },
    { category: 'languages', value: 'v3', modified: otherUtils.now() },
  ],
};

const browseResults = {
  total: 2,
  repos: [{ repoId: 'repo-1' }, { repoId: 'repo-2' }],
};

const filters = {
  agencies: [
    { name: 'a1', value: 'v1' },
    { name: 'a2', value: 'v2' },
  ],
  languages: [
    { name: 'l1', value: 'v3' },
  ],
  licenses: [],
  usageTypes: [],
};

const dispatch = jest.fn();

describe('containers - BrowseProjects', () => {
  describe('mapStateToProps', () => {
    it('should map `boxes` based off `filters`, checked if a matching browseParam filter value', () => {
      const actual = mapStateToProps({ browseParams, browseResults, filters }).boxes;
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
      };
      expect(actual).toEqual(expected);
    });

    it('should map no `boxes` if no filters provided', () => {
      expect(mapStateToProps({ browseParams, browseResults }).boxes).toEqual({});
    });

    it('should map `filterTags` based off `browseParams` and `filters`', () => {
      jest.spyOn(otherUtils, 'getFilterTags');
      mapStateToProps({ browseParams, browseResults, filters });
      expect(otherUtils.getFilterTags).toBeCalledWith(browseParams, filters);
    });

    it.each`
      selected
      ${'data_quality'}
      ${'a-z'}
      ${'last_updated'}
    `('should set the `sortOptions` value as $selected when selected', ({ selected }) => {
      const { sortOptions } = mapStateToProps({
        browseParams: { ...browseParams, sort: selected },
        browseResults,
        filters,
      });
      expect(sortOptions.find(x => x.selected).value).toBe(selected);
    });

    it('should return the correct properties', () => {
      expect(mapStateToProps({ browseParams, browseResults, filters })).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    describe('onFilterBoxChange', () => {
      it('should dispatch the `updateBrowseFilters` action with the correct params', () => {
        const change = { value: 123, type: 'test-type' };
        mapDispatchToProps(dispatch).onFilterBoxChange('category', change);

        expect(dispatch).toBeCalled();
        expect(updateBrowseFilters).toBeCalledWith('category', change.value, change.type);
      });
    });
  });
});
