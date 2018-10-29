import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { map, some } from '@code.gov/cautious'
import FilterBox from 'components/filter-box'
import Pagination from 'components/pagination'
import SiteBanner from 'components/site-banner'
import TaskCard from 'components/task-card'
import { scrollToTopOfResults } from 'utils/other'
import { isChecked } from 'utils/filtering'

export default class OpenTasks extends React.Component {

  componentDidMount() {
    const boxes = this.props.boxes || {}
    if (Object.keys(boxes).length === 0) this.props.saveFilterData()
    if (!this.props.tasks) this.props.syncResults();
  }

  get counter() {
    const { total } = this.props
    let textContent
    if (total) {
      if (total === 0) {
        textContent = 'There are currently no open tasks'
      } else if (total === 1) {
        textContent = 'There is currently 1 open task'
      } else if (total >= 2) {
        textContent = `There are ${total} open tasks`
      } else {
        textContent = 'Loading Tasks'
      }
    } else {
      textContent = 'Loading Tasks'
    }
    return <h3 className="repos-count width-three-quarters">{textContent}</h3>
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()

    const filters = {
      agencies: this.props.boxes.agencies.filter(isChecked),
      categories: this.props.boxes.categories.filter(isChecked),
      languages: this.props.boxes.languages.filter(isChecked),
      skillLevels: this.props.boxes.skillLevels.filter(isChecked),
      timeRequired: this.props.boxes.timeRequired.filter(isChecked)
    }

    filters[category] = values

    console.warn("cat val:", category, values)
    console.warn("filters:", filters)
    this.props.onFilterBoxChange(filters)
  }

  updatePage(newPage) {
    scrollToTopOfResults()
    this.props.updatePage(newPage)
  }

  render() {
    const total = this.props.total || 0
    return (
      <div className="search-results-content">
        <SiteBanner title='Open Tasks' />
        <div className="indented">
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li>Open Tasks</li>
          </ul>
        </div>
        <div className="search-results-header">
          <div className="width-quarter">
          </div>
          {this.counter}
        </div>
        <div className="indented">
          <div id="filter-boxes-section">
            <h2>Filter</h2>

            {some(this.props.boxes.languages) && (
            <FilterBox title="Language" options={this.props.boxes.languages} onChange={values => this.onFilterBoxChange('languages', values)} />
            )}

            {some(this.props.boxes.agencies) && (
            <FilterBox title="Federal Agency" options={this.props.boxes.agencies} onChange={values => this.onFilterBoxChange('agencies', values)} />
            )}

            {some(this.props.boxes.skillLevels) && (
            <FilterBox title="Skill Level" options={this.props.boxes.skillLevels} onChange={values => this.onFilterBoxChange('skillLevels', values)} />
            )}

            {some(this.props.boxes.timeRequired) && (
            <FilterBox title="Time Required" options={this.props.boxes.timeRequired} onChange={values => this.onFilterBoxChange('timeRequired', values)} />
            )}

            {some(this.props.categories) && (
            <FilterBox title="Type" options={this.categories} onChange={values => this.onFilterBoxChange('categories', values)} />
            )}
          </div>
        </div>
        <div id="filter-results-section">
          <div className="sort-section">
            <h2>
              <span>Explore Open Tasks</span>
            </h2>
          </div>
          <ul className="help-wanted-content-items">
            {map(this.props.tasks, task => {
              return (<li className="help-wanted-content-item" key={JSON.stringify(task.id)}><TaskCard task={task} /></li>)
            })}
            {total > 0 && <Pagination count={total} pagesize={this.props.selections.pageSize} page={this.props.selections.page} updatePage={::this.updatePage} />}
          </ul>
        </div>
      </div>
    )
  }
}
