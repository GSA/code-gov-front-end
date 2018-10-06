import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { refreshView, getLowerSet } from 'utils'
import FilterBox from 'components/filter-box'
import RepoCard from 'components/repo-card'
import SearchPageSearchBox from 'components/search-page-search-box'

export default class SearchPage extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount () {
    refreshView();
    if (!this.props.filterData) this.props.saveFilterData();
    this.usageTypes = [
      {"name":"Open Source","value":"openSource"},
      {"name":"Government-Wide Reuse","value":"governmentWideReuse"}
    ]
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== this.props || JSON.stringify(nextState) !== this.state
  }

  onFilterBoxChange(category, values) {
    this.scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  scrollToTopOfResults() {
    this.refs.crumbs.scrollIntoView()
    window.scrollBy(0, -100)
  }

  get repoCounter() {
    let textContent
    if (this.props.filteredResults) {
      const total = this.props.filteredResults.length
      const query = this.props.query
      if (total === 0) {
        textContent = `We found no Repositories for "${query}"`
      } else if (total === 1) {
        textContent = `We found 1 Repository for "${query}"`
      } else if (total >= 2) {
        textContent = `We found ${total} Repositories for "${query}"`
      } else {
        textContent = 'Loading Repositories'
      }
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
            <div className="filter-tag" key={tag.name} onClick={() => this.removeFilterTag(tag)}>
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

  get reposContainer() {
    const filteredResults = this.props.filteredResults
    console.log("starting reposContainers with filteredResults:", filteredResults)

    if (filteredResults) {
      return (
        <div className="repos-container">
          <ul className="repos-list repos-list--infinite-scrolled">
          {filteredResults.slice(0, 50).map(repo => <RepoCard key={repo.repoID} repo={repo}/>)}
          </ul>
          <ul className="repos-list repos-list--paged">
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="search-results-content">
        <simple-banner image={this.props.backgroundImage} title='Search Results' />
        <div className="indented" ref="crumbs">
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li>Search Results</li>
          </ul>
        </div>
        <div className="search-results-header">
          <div className="indented">
            <div className="width-quarter">
              <SearchPageSearchBox />
            </div>
            {this.repoCounter}
          </div>
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

            {Array.isArray(this.props.licenses) && this.props.licenses.length > 1 && (
            <FilterBox title="License" options={this.props.licenses} onChange={event => this.onFilterBoxChange('licenses', event)} />
            )}

            {this.usageTypes && (
            <FilterBox title="Usage Type" options={this.usageTypes} onChange={event => this.onFilterBoxChange('usageTypes', event)} />
            )}

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
            <div className="repo-list">
              {this.reposContainer}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
