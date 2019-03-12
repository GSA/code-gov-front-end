import updateTaskFilters from 'actions/update-task-filters'
import updateTaskParams from 'actions/update-task-params'
import saveTaskFilterOptions from 'actions/save-task-filter-options'
import * as otherUtils from 'utils/other'
import { mapStateToProps, mapDispatchToProps } from 'components/open-tasks/open-tasks.container'

jest.mock('actions/update-task-filters')
jest.mock('actions/update-task-params')
jest.mock('actions/save-task-filter-options')

const props = {
  taskParams: {
    page: 2,
    size: 3,
    filters: [
      { category: 'agencies', value: 'v0', modified: otherUtils.now() },
      { category: 'agencies', value: 'v2', modified: otherUtils.now() },
      { category: 'languages', value: 'v3', modified: otherUtils.now() },
    ],
  },
  taskResults: {
    total: 2,
    tasks: [{ id: 'task-1' }, { id: 'task-2' }],
  },
  taskFilterOptions: {
    agencies: [
      { name: 'a1', value: 'v1' },
      { name: 'a2', value: 'v2' },
    ],
    categories: [],
    languages: [
      { name: 'l1', value: 'v3' },
    ],
    skillLevels: [],
    timeRequired: [],
  },
}

const dispatch = jest.fn()

describe('containers - MobileMenuOption', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })

    it('should map no `boxes` if no filters provided', () => {
      expect(mapStateToProps({ ...props, taskFilterOptions: undefined }).boxes).toEqual({})
    })

    it('should default the `total` to 0', () => {
      const newProps = { ...props, taskResults: { ...props.taskResults, total: undefined } }
      expect((mapStateToProps(newProps)).total).toBe(0)
    })

    it('should catch errors', () => {
      expect(() => mapStateToProps({})).not.toThrow()
      expect(console.error).toBeCalled()
    })
  })

  describe('mapDispatchToProps', () => {
    describe('onFilterBoxChange', () => {
      it('should dispatch the `updateTaskFilters` action', () => {
        const change = { value: 'test-value', type: 'test-type' }
        mapDispatchToProps(dispatch).onFilterBoxChange('test-category', change)
        expect(dispatch).toBeCalled()
        expect(updateTaskFilters).toBeCalledWith('test-category', 'test-value', 'test-type')
      })
    })

    describe('onFilterTagClick', () => {
      it('should dispatch the `updateTaskFilters` action with the correct params', () => {
        mapDispatchToProps(dispatch).onFilterTagClick('test-category', 'test-value')
        expect(dispatch).toBeCalled()
        expect(updateTaskFilters).toBeCalledWith('test-category', 'test-value', 'removed')
      })
    })

    describe('saveFilterData', () => {
      it('should dispatch the `saveTaskFilterOptions` action', () => {
        mapDispatchToProps(dispatch).saveFilterData()
        expect(dispatch).toBeCalled()
        expect(saveTaskFilterOptions).toBeCalled()
      })
    })

    describe('updatePage', () => {
      it('should dispatch the `updateTaskParams` action with the correct params', () => {
        mapDispatchToProps(dispatch).updatePage(2)
        expect(dispatch).toBeCalled()
        expect(updateTaskParams).toBeCalledWith({ page: 2 })
      })
    })
  })
})
