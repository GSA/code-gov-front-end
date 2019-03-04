import updateBrowseParams from 'actions/update-browse-params';
import updateSearchParams from 'actions/update-search-params';
import updateTaskParams from 'actions/update-task-params';
import { getNormalizedURLSearchParams, getSection } from 'utils/url-parsing';
import * as otherUtils from 'utils/other';
import { mapStateToProps, mapDispatchToProps } from 'components/app/app.container.js';

jest.mock('actions/update-browse-params');
jest.mock('actions/update-search-params');
jest.mock('actions/update-task-params');
jest.mock('utils/url-parsing');
otherUtils.now = () => 123; // mock date to be consistent

const searchParams = {
  agencies: ['a1', 'a2'],
  languages: ['l1'],
  page: 'test-page',
  sort: 'test-sort',
  size: 'test-size',
  query: 'test-query',
};

const dispatch = jest.fn();

describe('containers - App', () => {
  beforeEach(() => {
    getNormalizedURLSearchParams.mockImplementation(() => searchParams);
  });

  describe('mapStateToProps', () => {
    it('should map `plugins` to the `plugins` config value', () => {
      expect(mapStateToProps().plugins).toEqual(global.SITE_CONFIG.plugins);
    });
  });

  describe('mapDispatchToProps', () => {
    describe('rehydrate', () => {
      it('should dispatch the `updateBrowseParams` action with the correct params if the section is `browse`', () => {
        const expectedParams = {
          page: 'test-page',
          sort: 'test-sort',
          size: 'test-size',
          filters: [
            { category: 'agencies', value: 'a1', modified: otherUtils.now() },
            { category: 'agencies', value: 'a2', modified: otherUtils.now() },
            { category: 'languages', value: 'l1', modified: otherUtils.now() },
          ],
        };

        getSection.mockImplementation(() => 'browse');
        mapDispatchToProps(dispatch).rehydrate();

        expect(dispatch).toBeCalled();
        expect(updateBrowseParams).toBeCalledWith(expectedParams);
      });
    });

    it('should dispatch the `updateSearchParams` action with the correct params if the section is `search`', () => {
      const expectedParams = {
        page: 'test-page',
        query: 'test-query',
        sort: 'test-sort',
        size: 'test-size',
        filters: [
          { category: 'agencies', value: 'a1', modified: otherUtils.now() },
          { category: 'agencies', value: 'a2', modified: otherUtils.now() },
          { category: 'languages', value: 'l1', modified: otherUtils.now() },
        ],
      };

      getSection.mockImplementation(() => 'search');
      mapDispatchToProps(dispatch).rehydrate();

      expect(dispatch).toBeCalled();
      expect(updateSearchParams).toBeCalledWith(expectedParams);
    });

    it('should dispatch the `updateTaskParams` action with the correct params if the section is `tasks`', () => {
      const expectedParams = {
        page: 'test-page',
        size: 'test-size',
        filters: [
          { category: 'agencies', value: 'a1', modified: otherUtils.now() },
          { category: 'agencies', value: 'a2', modified: otherUtils.now() },
          { category: 'languages', value: 'l1', modified: otherUtils.now() },
        ],
      };

      getSection.mockImplementation(() => 'tasks');
      mapDispatchToProps(dispatch).rehydrate();

      expect(dispatch).toBeCalled();
      expect(updateTaskParams).toBeCalledWith(expectedParams);
    });

    it('should not dispatch an action for unknown sections', () => {
      getSection.mockImplementation(() => 'unknown');
      mapDispatchToProps(dispatch).rehydrate();
      expect(dispatch).not.toBeCalled();
    });
  });
});
