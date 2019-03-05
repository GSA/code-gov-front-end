import { push } from 'connected-react-router';

import saveAgencies from 'actions/save-agencies';
import updateBrowseParams from 'actions/update-browse-params';
import { now } from 'utils/other';
import { mapStateToProps, mapDispatchToProps } from 'components/home-banner/home-banner.container.js';

jest.mock('connected-react-router');
jest.mock('actions/save-agencies');
jest.mock('actions/update-browse-params');

const props = {
  agencies: [
    { acronym: 'a1', name: 'agency-1' },
    { acronym: 'a2', name: 'agency-2' },
  ],
};

const params = {
  page: 1,
  size: 10,
  sort: 'data_quality',
  filters: [],
};

const dispatch = jest.fn();

// helper function for testing `onBrowseByEntityChange` dispatches an action with expected params
const testByValue = ({ value, action, expected }) => {
  const event = { target: { value } };
  mapDispatchToProps(dispatch).onBrowseByEntityChange(event);
  expect(dispatch).toBeCalled();
  expect(action).toBeCalledWith(expected);
};

describe('containers - HomeBanner', () => {
  describe('mapStateToProps', () => {
    it('should map the agencies passed to the `agencies` key', () => {
      const { agencies } = mapStateToProps(props);
      expect(agencies).toBe(props.agencies);
    });

    it('should get the values from config', () => {
      const values = mapStateToProps(props);
      expect(values.backgroundImage).toBeDefined();
      expect(values.motto).toBeDefined();
      expect(values.subtitle).toBeDefined();
      expect(values.helpWantedTitle).toBeDefined();
      expect(values.helpWantedDescription).toBeDefined();
      expect(values.helpWantedButton).toBeDefined();
      expect(values.issueUrl).toBeDefined();
      expect(values.browseByText).toBeDefined();
    });
  });

  describe('mapDispatchToProps', () => {
    describe('onBrowseByEntityChange', () => {
      describe('value is `browse by agency`', () => {
        it('should do nothing', () => {
          const event = { target: { value: 'browse by agency' } };
          mapDispatchToProps(dispatch).onBrowseByEntityChange(event);
          expect(dispatch).not.toBeCalled();
        });
      });

      describe('value is `all`', () => {
        it('should dispatch the `updateBrowseParams` action', () => {
          testByValue({ value: 'all', action: updateBrowseParams, expected: params });
        });

        it('should dispatch an action to push the url', () => {
          const expected = '/browse-projects?page=1&size=10&sort=data_quality';
          testByValue({ value: 'all', action: push, expected });
        });
      });

      describe('value is neither `all` nor `browse by agency`', () => {
        it('should dispatch the `updateBrowseParams` action with an agency filter', () => {
          const expected = {
            ...params,
            filters: [{ category: 'agencies', value: 'other-value', modified: now() }],
          };
          testByValue({ value: 'other-value', action: updateBrowseParams, expected });
        });

        it('should dispatch an action to push the url with the agency set', () => {
          const expected = `/browse-projects?agencies=other-value&page=1&size=10&sort=data_quality`;
          testByValue({ value: 'other-value', action: push, expected });
        });
      });
    });

    describe('saveAgencies', () => {
      mapDispatchToProps(dispatch).saveAgencies();
      expect(dispatch).toBeCalled();
      expect(saveAgencies).toBeCalled();
    });
  });
});
