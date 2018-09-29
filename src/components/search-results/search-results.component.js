import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { refreshView } from 'utils'

export default class SearchResults extends React.Component {

  componentDidMount () {
    refreshView();
    if (!this.props.filterData) this.props.saveFilterData();
  }

  getFilterData(key) {
    const filters = this.props.filters;
    if (filters && filters[key]) {
      return JSON.stringify(filters[key])
    } else {
      return JSON.stringify([])
    }
  }

  get agencies() {
    return this.getFilterData('agencies')
  }

  get languages() {
    return this.getFilterData('languages')
  }

  get licenses() {
    return this.getFilterData('licenses')
  }

  get repoCounter() {
    const { total } = this.props
    let textContent
    if (total === 0) {
      textContent = 'No Repositories'
    } else if (total === 1) {
      textContent = '1 Repository'
    } else if (total >= 2) {
      textContent = `${total} Repositories`
    } else {
      textContent = 'Loading Repositories'
    }
    return <h3 className="repos-count width-three-quarters">{textContent}</h3>
  }

  get filterTags() {
    if (this.state.filterTags) {
      return (
        <div className="filter-tags">
          {this.state.filterTags.map(tag => {
            <div className="filter-tag" onClick={() => this.removeFilterTag(tag)}>
              <div className="filter-tag-title">{tag.name}</div>
            </div>
          })}
        </div>
      )
    }
  }

  removeFilterTag(selectedTag) {
    console.log("starting removeFilterTag")
    const filterTags = this.state.filterTags.filter(tag => tag !== selectedTag);
    this.setState({ filterTags })
  }

  render() {
    const agencies = JSON.stringify(this.props.agencies)
    return (
      <div className="search-results-content">
        <simple-banner image={this.props.backgroundImage} title='Search Results' />
        <div className="indented">
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li>Search Results</li>
          </ul>
        </div>
        <div className="search-results-header">
            <div className="indented">
              <div className="width-quarter"></div>
              {this.repoCounter}
            </div>
          </div>
        <div className="indented">
          <div id="filter-boxes-section">
            <h2>Filter</h2>

            <filter-box
              title="Language"
              options={this.languages}
              onChange={this.onFilterBoxChange}
            ></filter-box>

            <filter-box
              title="Federal Agency"
              options={this.agencies}
              onChange={this.onFilterBoxChange}
            ></filter-box>

            <filter-box
              title="License"
              options={this.licenses}
              onChange={this.onFilterBoxChange}
            ></filter-box>

            <filter-box
              title="Usage Type"
              options='[{"name":"Open Source","value":"openSource"},{"name":"Government-Wide Reuse","value":"governmentWideReuse"}]'
              onChange={this.onFilterBoxChange}
            ></filter-box>

          </div>
          <div id="filter-results-section">
            <div className="sort-section">
              <h2>
                <span>Sort by</span>
                <select onChange={this.onSortSelectionChange}>
                  <option value="Best Match">Best Match</option>
                  <option value="Data Quality">Data Quality</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Last Updated">Last Updated</option>
                </select>
              </h2>
            </div>
            {/*
            {this.state.isLoading && <div>Loading</div>}
            <repo-list *ngIf="!isLoading" [queryValue]="queryValue" [results]="finalResults" [pageSize]="pageSize"></repo-list>
            */}
          </div>
        </div>
      </div>
    )
  }
}
