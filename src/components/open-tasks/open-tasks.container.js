import { connect } from 'react-redux'
import { getFilterValuesFromParamsByCategory, getFilterTags, normalize } from 'utils/other'
import updateTaskFilters from 'actions/update-task-filters'
import updateTaskParams from 'actions/update-task-params'
import saveTaskFilterOptions from 'actions/save-task-filter-options'
import get from 'lodash.get'
import { includes } from '@code.gov/cautious'
import OpenTasksComponent from './open-tasks.component'

export const mapStateToProps = ({ taskFilterOptions, taskParams, taskResults }) => {
  try {
    const categories = ['agencies', 'categories', 'languages', 'skillLevels', 'timeRequired']

    const selections = categories.reduce((accumulator, key) => {
      accumulator[key] = getFilterValuesFromParamsByCategory(taskParams, key)
      return accumulator
    }, {})

    const selectedPage = taskParams.page
    const selectedPageSize = taskParams.size

    let boxes = {}
    if (taskFilterOptions) {
      boxes = categories.reduce((accumulator, key) => {
        accumulator[key] = taskFilterOptions[key].map(({ name, value }) => ({
          name,
          value,
          checked: includes(normalize(selections[key]), normalize(value))
        }))
        return accumulator
      }, {})
    }

    const total = get(taskResults, 'total') || 0
    const tasks = get(taskResults, 'tasks')

    const filterTags = getFilterTags(taskParams, taskFilterOptions)

    const result = {
      boxes,
      selections,
      filterTags,
      selectedPage,
      selectedPageSize,
      tasks,
      total
    }
    console.log('open-tasks.container passing to component:', result)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const mapDispatchToProps = (dispatch, _ownProps) => ({
  onFilterBoxChange: (category, change) => {
    dispatch(updateTaskFilters(category, change.value, change.type))
  },
  onFilterTagClick: (category, value) => {
    dispatch(updateTaskFilters(category, value, 'removed'))
  },
  saveFilterData: () => dispatch(saveTaskFilterOptions()),
  updatePage: newPage => {
    dispatch(updateTaskParams({ page: newPage }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenTasksComponent)
