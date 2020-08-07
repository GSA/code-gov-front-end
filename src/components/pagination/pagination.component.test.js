import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText } from 'testUtils/render'
import Pagination from 'components/pagination/pagination.component'

const props = {
  page: 2, // 1 = first, 3 = last (30 total with 10 per page)
  count: 30,
  pagesize: 10,
  updatePage: jest.fn()
}

let wrapper
let instance
describe('components - Pagination', () => {
  beforeEach(() => {
    wrapper = shallow(<Pagination {...props} />)
    instance = wrapper.instance()
  })

  describe('handleChangePage', () => {
    it('should call `udpatePage` with the new page', () => {
      instance.handleChangePage(3)
      expect(props.updatePage).toBeCalledWith(3)
    })

    it('should give a warning if no `updatePage` provided', () => {
      wrapper.setProps({ updatePage: undefined })
      instance.handleChangePage(3)
      expect(console.warn).toBeCalled()
    })
  })

  describe('handleNext', () => {
    it('should call `handleChangePage` with the next page number', () => {
      jest.spyOn(instance, 'handleChangePage')
      instance.handleNext()
      expect(instance.handleChangePage).toBeCalledWith(props.page + 1)
    })
  })

  describe('getDisplayPages', () => {
    it('should return the correct displayPages array for the current props', () => {
      expect(instance.getDisplayPages()).toEqual([1, 2, 3])

      wrapper.setProps({ count: 80 })
      expect(instance.getDisplayPages()).toEqual([1, 2, 3, 4, 5, 'right-ellipsis', 8])

      wrapper.setProps({ page: 5 })
      expect(instance.getDisplayPages()).toEqual([1, 'left-ellipsis', 4, 5, 6, 7, 8])

      wrapper.setProps({ count: 100 })
      expect(instance.getDisplayPages()).toEqual([
        1,
        'left-ellipsis',
        4,
        5,
        6,
        'right-ellipsis',
        10
      ])
    })
  })

  describe('handlePrevious', () => {
    it('should call `handleChangePage` with the previous page number', () => {
      jest.spyOn(instance, 'handleChangePage')
      instance.handlePrevious()
      expect(instance.handleChangePage).toBeCalledWith(props.page - 1)
    })
  })

  describe('isLastPage', () => {
    it('should return true if the page is the last page', () => {
      wrapper.setProps({ page: 3 })
      expect(instance.isLastPage).toBeTruthy()
    })

    it('should return false if the page is not the last page', () => {
      expect(instance.isLastPage).toBeFalsy()
    })
  })

  describe('leftIcon', () => {
    it('should return a span if on the first page', () => {
      wrapper.setProps({ page: 1 })
      const icon = shallow(instance.leftIcon)
      expect(icon.find('span').length).toBe(1)
    })

    it('should return an anchor that calls `handlePrevious` on click if not on the first page', () => {
      jest.spyOn(instance, 'handlePrevious')
      const icon = shallow(instance.leftIcon)
      icon.simulate('click')
      expect(icon.find('button').length).toBe(1)
      expect(instance.handlePrevious).toBeCalled()
    })
  })

  describe('rightIcon', () => {
    it('should return a span if on the last page', () => {
      wrapper.setProps({ page: 3 })
      const icon = shallow(instance.rightIcon)
      expect(icon.find('span').length).toBe(1)
    })

    it('should return an anchor that calls `handleNext` on click if not on the last page', () => {
      jest.spyOn(instance, 'handleNext')
      const icon = shallow(instance.rightIcon)
      icon.simulate('click')
      expect(icon.find('button').length).toBe(1)
      expect(instance.handleNext).toBeCalled()
    })
  })

  describe('getSummary', () => {
    it('should display a `min-max of count` indicator', () => {
      const summary = instance.getSummary({ count: 6, minItemIndex: 2, maxItemIndex: 4 })
      testRenderText(summary, /2-4 of 6/)
    })

    it('should display a `No results found` indicator if no count', () => {
      const summary = instance.getSummary({ count: 0 })
      testRenderText(summary, /No results found/i)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call handleChangePage when someone clicks on a results link that is a number', () => {
      const link = wrapper.find('[data-testid="component-pagination-page-link-3"]')
      jest.spyOn(instance, 'handleChangePage')
      link.simulate('click')
      expect(instance.handleChangePage).toBeCalledTimes(1)
      expect(instance.handleChangePage).toBeCalledWith(3)
    })
  })
})
