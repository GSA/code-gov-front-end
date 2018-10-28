/* global URLSearchParams */
import { connect } from 'react-redux'
import { getConfigValue, getFilterData, normalize } from 'utils/other'
import OpenTasksComponent from './open-tasks.component'
import updateTaskFilters from 'actions/update-task-filters'
import updatePage from 'actions/update-page'
import saveTaskFilterOptions from 'actions/save-task-filter-options'
import saveTasks from 'actions/save-tasks'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { push } from 'connected-react-router'
import { has, excludes, includes, some, overlaps } from '@code.gov/cautious'

const mapStateToProps = ({ filters, taskFilterOptions, tasks, taskFilters, taskHistory }) => {

 try {

  console.log("taskFilterOptions:", taskFilterOptions)

  const currentTasks = tasks

  const keys = ['agencies', 'skillLevels', 'languages', 'categories', 'timeRequired']

  const selections = {}
  keys.forEach(key => {
    if (has(taskFilters, key)) {
      selections[key] = normalize(taskFilters[key])
    }
  })
  console.log("selections:", selections)

  const filterBoxItems = {}
  keys.forEach(key => {
    if (has(taskFilterOptions, key)) {
      filterBoxItems[key] = taskFilterOptions[key].map(({ name, value }) => {
        return { name, value, checked: includes(selections[key], normalize(value)) }
      })
    }
  })

  const filteredResults = currentTasks && currentTasks.filter(task => {
    if (some(selections.agencies) && excludes(selections.agencies, normalize(task.agency.acronym))) {
      return false
    }

    if (some(selections.skillLevels) && excludes(selections.skillLevels, normalize(task.skill))) {
      return false
    }

    if (some(selections.languages) && !overlaps(selections.languages, normalize(task.languages))) {
      return false
    }

    if (some(selections.categories) && excludes(selections.categories, normalize(task.type))) {
      return false
    }

    if (some(selections.timeRequired) && excludes(selections.timeRequired, normalize(task.effort))) {
      return false
    }

    return true
  })

  console.log("filteredResults:", filteredResults)

  return { boxes: filterBoxItems, filteredResults, tasks }
 } catch (error) {
  console.error(error)
 }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilterBoxChange: (category, event) => {
      // we want to make sure we get the event for the filter-box and not its subcomponents
      if (event.target.tagName.toLowerCase() === 'filter-box') {
        const values = event.target.values
        dispatch(updateTaskFilters(category, values))

        const urlSearchParams = new URLSearchParams(window.location.search)
        if (values.length === 0) {
          urlSearchParams.delete(category)
        } else {
          urlSearchParams.set(category, values.join(','))
        }

        const newUrl = window.location.pathname + "?" + urlSearchParams.toString()

        dispatch(push(newUrl))
      }
    },
    saveFilterData: () => dispatch(saveTaskFilterOptions()),
    saveTasks: () => dispatch(saveTasks()),
    updatePage: newPage => {
      dispatch(updatePage(newPage))
      dispatch(updateTaskFilters('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTasksComponent)
