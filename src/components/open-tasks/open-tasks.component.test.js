import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText } from 'testUtils/render'
import { scrollToTopOfResults } from 'utils/other'
import OpenTasks from 'components/open-tasks/open-tasks.component'

jest.mock('utils/other')

const props = {
  total: 2,
  tasks: [{ id: 'task-1' }, { id: 'task-2' }],
  boxes: ['box-1', 'box-2'],
  filterTags: ['filter-1', 'filter-2'],
  onFilterTagClick: jest.fn(),
  selectedPage: 1,
  selectedPageSize: 2,
  saveFilterData: jest.fn(),
  onFilterBoxChange: jest.fn(),
  updatePage: jest.fn()
}

let wrapper
let instance
describe('components - OpenTasks', () => {
  beforeEach(() => {
    wrapper = shallow(<OpenTasks {...props} />)
    instance = wrapper.instance()
  })

  describe('shouldComponentUpdate', () => {
    it('should update on changes', () => {
      const nextProps = { ...props, selectedPage: 2 }
      expect(instance.shouldComponentUpdate(nextProps)).toBeTruthy()
    })

    it('should not update when no changes', () => {
      expect(instance.shouldComponentUpdate(props)).toBeFalsy()
    })
  })

  describe('componentDidMount', () => {
    it('should save the filter data if no boxes', () => {
      wrapper.setProps({ boxes: undefined })
      instance.componentDidMount()
      expect(props.saveFilterData).toBeCalled()
    })

    it('should not save filter data boxes exist', () => {
      expect(props.saveFilterData).not.toBeCalled()
    })
  })

  describe('counter', () => {
    it.each`
      total        | match
      ${0}         | ${/no/i}
      ${1}         | ${/1/}
      ${9}         | ${/9/}
      ${undefined} | ${/loading/i}
    `('should render text that matches $match when the total is $total', ({ total, match }) => {
      wrapper.setProps({ total })
      testRenderText(instance.counter, match)
    })
  })

  describe('onFilterBoxChange', () => {
    beforeEach(() => {
      instance.onFilterBoxChange('category', 'values')
    })

    it('should scroll to the top of the results', () => {
      document.body.innerHTML =
        '<header class="usa-card__header"><h3 class="usa-card__heading font-heading-lg margin-top-0"><a href="https://github.com/GSA/code-gov-api/issues/207" target="_blank" rel="noopener noreferrer" class="issue-link">Add broken links to status report</a></h3></header>'
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
      expect(scrollToTopOfResults).toBeCalled()
    })

    it('should update the page value', () => {
      document.body.innerHTML =
        '<header class="usa-card__header"><h3 class="usa-card__heading font-heading-lg margin-top-0"><a href="https://github.com/GSA/code-gov-api/issues/207" target="_blank" rel="noopener noreferrer" class="issue-link">Add broken links to status report</a></h3></header>'
      expect(props.updatePage).toBeCalledWith('page')
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
