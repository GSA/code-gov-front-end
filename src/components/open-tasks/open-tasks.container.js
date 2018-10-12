import { connect } from 'react-redux';
import { getConfigValue, getFilterData, normalize } from 'utils'
import OpenTasksComponent from './open-tasks.component'
import updateTaskFilters from 'actions/update-task-filters'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { push } from 'connected-react-router'

const mapStateToProps = ({ filters, siteConfig, taskFilters, taskHistory }) => {
  const currentTasks = taskHistory && taskHistory.length ? taskHistory[0] : null

  const selectedAgencies = normalize(taskFilters ? taskFilters.agencies : [])
  const selectedSkillLevels = normalize(taskFilters ? taskFilters.skillLevels : [])
  const selectedLanguages = normalize(taskFilters ? taskFilters.languages : [])
  const selectedUsageTypes = normalize(taskFilters ? taskFilters.usageTypes : [])
  const selectedCategories = normalize(taskFilters ? taskFilters.categories : [])
  const selectedDurations = normalize(taskFilters ? taskFilters.durations : [])

  let agencies = getFilterData('agencies', 'agency.acronym', currentTasks, filters)
  if (agencies) {
    agencies = agencies.map(({name, value}) => {
      return { name, value, checked: includes(selectedAgencies, normalize(value)) }
    })
  }

  let languages = getFilterData('languages', 'languages', currentTasks, filters)
  if (languages) {
    languages = languages.map(({name, value}) => {
      return { name, value, checked: includes(selectedLanguages, normalize(value)) }
    })
  }

  return {}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTasksComponent)
