import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FilterBox from 'components/filter-box'
import SiteBanner from 'components/site-banner'

export default class OpenTasks extends React.Component {

  constructor() {
    super()
    this.skillLevels = [
      { name: "Small", value: "small" },
      { name: "Medium", value: "medium" },
      { name: "Large", value: "large" }
    ]
    this.timeRequired = [
      { name: "Small", value: "small" },
      { name: "Medium", value: "medium" },
      { name: "Large", value: "large" }
    ]
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

            {Array.isArray(this.props.languages) && this.props.languages.length > 1 && (
            <FilterBox title="Language" options={this.props.languages} onChange={event => this.onFilterBoxChange('languages', event)} />
            )}

            {Array.isArray(this.props.agencies) && this.props.agencies.length > 1 && (
            <FilterBox title="Federal Agency" options={this.props.agencies} onChange={event => this.onFilterBoxChange('agencies', event)} />
            )}

            <FilterBox title="Skill Level" options={this.skillLevels} onChange={event => this.onFilterBoxChange('skillLevels', event)} />

            <FilterBox title="Time Required" options={this.timeRequired} onChange={event => this.onFilterBoxChange('timeRequired', event)} />

            {Array.isArray(this.props.categories) && this.props.categories.length > 1 && (
            <FilterBox title="Type" options={this.category} onChange={event => this.onFilterBoxChange('Category', event)} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
