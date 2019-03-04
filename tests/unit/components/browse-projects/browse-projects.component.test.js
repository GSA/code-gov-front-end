import React from 'react';
import { shallow } from 'enzyme';

import { refreshView, scrollToTopOfResults } from 'utils/other';
import RepoCard from 'components/repo-card';
import BrowseProjects from 'components/browse-projects/browse-projects.component';

jest.mock('utils/other');

const props = {
  total: 2,
  repos: [ { repoId: 'repo-1' }, { repoId: 'repo-2' } ],
  boxes: [ 'box-1' , 'box-2' ],
  sortOptions: [ 'sort-1', 'sort-2' ],
  onSortChange: jest.fn(),
  filterTags: [ 'filter-1', 'filter-2' ],
  onFilterTagClick: jest.fn(),
  filterData: false, // not passed in container??
  selectedPage: 1,
  selectedPageSize: 2,
  saveFilterData: jest.fn(),
  onFilterBoxChange: jest.fn(),
  updatePage: jest.fn(),
};

let wrapper;
let instance;
describe('components - BrowseProjects', () => {
  beforeEach(() => {
    wrapper = shallow(<BrowseProjects {...props} />);
    instance = wrapper.instance();
  });

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled();
    });

    it('should save the filter data', () => {
      expect(props.saveFilterData).toBeCalled();
    });

    it('should not save filter data if it already exists', () => {
      jest.resetAllMocks();
      wrapper.setProps({ filterData: true });
      instance.componentDidMount();
      expect(props.saveFilterData).not.toBeCalled();
    });
  });

  describe('repoCounter', () => {
    it.each`
      total         | match
      ${0}          | ${/no/i}
      ${1}          | ${/1/}
      ${9}          | ${/9/}
      ${undefined}  | ${/loading/i}
    `(
      'should render text that matches $match when the total is $total',
      ({ total, match }) => {
        wrapper.setProps({ total });
        const repoCount = shallow(instance.repoCounter);
        expect(repoCount.text()).toMatch(match);
      }
    );
  });

  describe('reposContainer', () => {
    it('should render a list of all repos in `RepoCard`s', () => {
      const reposContainer = shallow(instance.reposContainer);
      expect(reposContainer.find(RepoCard).length).toBe(props.repos.length);
    });

    it('should throw on errors', () => {
      let error;
      try {
        wrapper.setProps({ repos: [undefined] }); // expects array of objects, will throw
        shallow(instance.reposContainer);
      } catch (err) {
        error = err;
      } finally {
        expect(console.error).toBeCalled();
        expect(error).toBeDefined();
      }
    });

    it('should render nothing if no repos', () => {
      wrapper.setProps({ repos: [] });
      expect(instance.reposContainer).toBeUndefined();
    })
  });

  describe('onFilterBoxChange', () => {
    it('should scroll to the top of the results', () => {
      instance.onFilterBoxChange('category', 'values');
      expect(scrollToTopOfResults).toBeCalled();
    });

    it('should change the filter box value', () => {
      instance.onFilterBoxChange('category', 'values');
      expect(props.onFilterBoxChange).toBeCalledWith('category', 'values');
    });
  });

  describe('updatePage', () => {
    it('should scroll to the top of the results', () => {
      instance.updatePage('page');
      expect(scrollToTopOfResults).toBeCalled();
    });

    it('should udpate the page value', () => {
      instance.updatePage('page');
      expect(props.updatePage).toBeCalledWith('page');
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
