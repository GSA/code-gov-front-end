import { push } from 'connected-react-router';

import updateSearchParams from 'actions/update-search-params';
import { mapStateToProps, mapDispatchToProps } from 'components/home-banner-search-box/home-banner-search-box.container.js';

jest.mock('connected-react-router');
jest.mock('actions/update-search-params');

const props = {
  query: 'test-query',
};

const dispatch = jest.fn();

// helper function for testing `onBrowseByEntityChange` dispatches an action with expected params
const testByValue = ({ value, action, expected }) => {
  const event = { target: { value } };
  mapDispatchToProps(dispatch).onBrowseByEntityChange(event);
  expect(dispatch).toBeCalled();
  expect(action).toBeCalledWith(expected);
};

describe('containers - HomeBannerSearchBox', () => {
  describe('mapStateToProps', () => {
    it('should map the query passed to the `query` key', () => {
      const { query } = mapStateToProps(props);
      expect(query).toBe(props.query);
    });

    it('should get the values from config', () => {
      const values = mapStateToProps(props);
      expect(values.placeholder).toBeDefined();
      expect(values.searchDescriptionText).toBeDefined();
      expect(values.searchDescriptionTextMobile).toBeDefined();
    });
  });

  describe('mapDispatchToProps', () => {
    describe('onSubmit', () => {
      describe('section is `search`', () => {
        it('should dispatch the `updateSearchParams` action with the correct params', () => {
          // BUG: missing call to getSection...?
        });
      });

      describe('section is not `search`', () => {
        it('should dispatch the `updateSearchParams` action with the correct params', () => {
          mapDispatchToProps(dispatch).onSubmit(props.query);
          expect(dispatch).toBeCalled();
          expect(updateSearchParams).toBeCalledWith({ page: 1, query: props.query, size: 10, sort: 'best_match' });
        });

        it('should dispatch the `push` action with the correct params', () => {
          mapDispatchToProps(dispatch).onSubmit(props.query);
          expect(dispatch).toBeCalled();
          expect(push).toBeCalledWith(`/search?page=1&query=${props.query}&size=10&sort=best_match`);
        });
      });
    });
  });
});
