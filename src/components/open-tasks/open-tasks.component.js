import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FilterBox from 'components/filter-box'
import SiteBanner from 'components/site-banner'
import TaskCard from 'components/task-card'
import { map, some } from 'cautious'

export default class OpenTasks extends React.Component {

  constructor() {
    super()
  }

  componentDidMount() {
    if (!this.props.filterData) this.props.saveFilterData()
    if (!this.props.tasks) this.props.saveTasks();
  }

  get counter() {
    let textContent
    if (this.props.filteredResults) {
      const total = this.props.filteredResults.length
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

  scrollToTopOfResults() {
    this.refs.crumbs.scrollIntoView()
    window.scrollBy(0, -100)
  }

  onFilterBoxChange(category, values) {
    this.scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  render() {
    return (
      <div className="search-results-content">
        <SiteBanner title='Open Tasks' />
        <div className="indented" ref="crumbs">
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
            <FilterBox title="Language" options={this.props.boxes.languages} onChange={event => this.onFilterBoxChange('languages', event)} />
            )}

            {some(this.props.boxes.agencies) && (
            <FilterBox title="Federal Agency" options={this.props.boxes.agencies} onChange={event => this.onFilterBoxChange('agencies', event)} />
            )}

            {some(this.props.boxes.skillLevels) && (
            <FilterBox title="Skill Level" options={this.props.boxes.skillLevels} onChange={event => this.onFilterBoxChange('skillLevels', event)} />
            )}

            {some(this.props.boxes.timeRequired) && (
            <FilterBox title="Time Required" options={this.props.boxes.timeRequired} onChange={event => this.onFilterBoxChange('timeRequired', event)} />
            )}

            {some(this.props.categories) && (
            <FilterBox title="Type" options={this.categories} onChange={event => this.onFilterBoxChange('categories', event)} />
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
            {map(this.props.filteredResults, task => {
              return (<li className="help-wanted-content-item" key={JSON.stringify(task.id)}><TaskCard task={task} /></li>)
            })}
         </ul>
        </div>
      </div>
    )
  }
}
