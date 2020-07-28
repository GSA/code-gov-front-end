import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText, testRenderList, testRenderEmpty } from 'testUtils/render'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import RepoCard from 'components/repo-card'
import SearchPage from 'components/search-page/search-page.component'

jest.mock('utils/other')

const props = {
  total: 2,
  searchParams: { query: 'test-params-query' },
  query: 'test-query',
  filteredResults: [{ repoId: 'repo-1' }, { repoId: 'repo-2' }],
  boxes: ['box-1', 'box-2'],
  sortOptions: ['sort-1', 'sort-2'],
  onSortChange: jest.fn(),
  filterTags: ['filter-1', 'filter-2'],
  onFilterTagClick: jest.fn(),
  filterData: false,
  selectedPage: 1,
  selectedPageSize: 2,
  saveFilterData: jest.fn(),
  onFilterBoxChange: jest.fn(),
  updatePage: jest.fn()
}

let wrapper
let instance
describe('components - SearchPage', () => {
  beforeEach(() => {
    wrapper = shallow(<SearchPage {...props} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled()
    })

    it('should save the filter data', () => {
      expect(props.saveFilterData).toBeCalled()
    })

    it('should not save filter data if it already exists', () => {
      jest.resetAllMocks()
      wrapper.setProps({ filterData: true })
      instance.componentDidMount()
      expect(props.saveFilterData).not.toBeCalled()
    })
  })

  describe('shouldComponentUpdate', () => {
    it('should update if next props are not current props', () => {
      const nextProps = { ...props, selectedPageSize: 8 }
      expect(instance.shouldComponentUpdate(nextProps)).toBeTruthy()
    })

    xit('should not update if next props are the same as current props', () => {
      // BUG: comparing stringified next props vs non-string current props, always updates
      // (and unnecessary comparing of state when state is not used)
      expect(instance.shouldComponentUpdate(props)).toBeFalsy()
    })
  })

  describe('onFilterBoxChange', () => {
    beforeEach(() => {
      instance.onFilterBoxChange('category', 'values')
    })

    it('should scroll to the top of the results', () => {
      document.body.innerHTML =
        '<header class="usa-card__header grid-col-9"><h3 class="usa-card__heading font-heading-lg margin-top-0"><a class="project-link" href="/projects/nsf_1_ember_common_components">ember-common-components</a></h3></header>'
      expect(scrollToTopOfResults).toBeCalled()
    })

    it('should change the filter box value', () => {
      expect(props.onFilterBoxChange).toBeCalledWith('category', 'values')
    })
  })

  describe('repoCounter', () => {
    it.each`
      total        | match
      ${0}         | ${/no/i}
      ${1}         | ${/1/}
      ${9}         | ${/9/}
      ${undefined} | ${/loading/i}
    `('should render text that matches $match when the total is $total', ({ total, match }) => {
      wrapper.setProps({ total })
      testRenderText(instance.repoCounter, match)
    })

    it('should render text that matches `loading` when no `filteredResults` provided', () => {
      wrapper.setProps({ filteredResults: undefined })
      testRenderText(instance.repoCounter, /loading/i)
    })
  })

  describe('reposContainer', () => {
    it('should render a list of all `filteredResults` in `RepoCard`s', () => {
      testRenderList(instance.reposContainer, RepoCard, props.filteredResults.length)
    })

    it('should render nothing if no `filteredResults`', () => {
      wrapper.setProps({ filteredResults: undefined })
      testRenderEmpty(instance.reposContainer)
    })
  })

  describe('updatePage', () => {
    beforeEach(() => {
      instance.updatePage('page')
    })

    it('should scroll to the top of the results', () => {
      expect(scrollToTopOfResults).toBeCalled()
    })

    it('should update the page value', () => {
      document.body.innerHTML =
        '<header class="usa-card__header grid-col-9"><h3 class="usa-card__heading font-heading-lg margin-top-0"><a class="project-link" href="/projects/nsf_1_ember_common_components">ember-common-components</a></h3></header>'
      expect(props.updatePage).toBeCalledWith('page')
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
