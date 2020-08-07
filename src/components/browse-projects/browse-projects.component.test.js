import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText, testRenderList, testRenderEmpty } from 'testUtils/render'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import RepoCard from 'components/repo-card'
import BrowseProjects from 'components/browse-projects/browse-projects.component'

jest.mock('utils/other')

const props = {
  total: 2,
  repos: [{ repoId: 'repo-1' }, { repoId: 'repo-2' }],
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
describe('components - BrowseProjects', () => {
  beforeEach(() => {
    wrapper = shallow(<BrowseProjects {...props} />)
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
  })

  describe('reposContainer', () => {
    it('should render a list of all repos in `RepoCard`s', () => {
      testRenderList(instance.reposContainer, RepoCard, props.repos.length)
    })

    it('should throw on errors', () => {
      let error
      try {
        wrapper.setProps({ repos: [undefined] }) // expects array of objects, will throw
        shallow(<div>{instance.reposContainer}</div>)
      } catch (err) {
        error = err
      } finally {
        expect(error).toBeDefined()
        expect(console.error).toBeCalled()
      }
    })

    it('should render nothing if no repos', () => {
      wrapper.setProps({ repos: [] })
      testRenderEmpty(instance.reposContainer)
    })
  })

  describe('onFilterBoxChange', () => {
    beforeEach(() => {
      instance.onFilterBoxChange('category', 'values')
    })

    it('should scroll to the top of the results', () => {
      document.body.innerHTML =
        '<header class="usa-card__header grid-col-9"><h3 class="usa-card__heading font-heading-lg margin-top-0"><a class="project-link" href="/projects/treasury_bureau_fiscal_service_bfs_1_data_act_broker_backend">data-act-broker-backend</a></h3></header>'
      expect(scrollToTopOfResults).toBeCalled()
    })

    it('should change the filter box value', () => {
      expect(props.onFilterBoxChange).toBeCalledWith('category', 'values')
    })
  })

  describe('updatePage', () => {
    beforeEach(() => {
      instance.updatePage('page')
    })

    it('should scroll to the top of the results', () => {
      document.body.innerHTML =
        '<header class="usa-card__header grid-col-9"><h3 class="usa-card__heading font-heading-lg margin-top-0"><a class="project-link" href="/projects/treasury_bureau_fiscal_service_bfs_1_data_act_broker_backend">data-act-broker-backend</a></h3></header>'
      expect(scrollToTopOfResults).toBeCalled()
    })

    it('should update the page value', () => {
      expect(props.updatePage).toBeCalledWith('page')
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
