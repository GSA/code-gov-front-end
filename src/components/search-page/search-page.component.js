import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import FilterBox from 'components/filter-box'
import Pagination from 'components/pagination'
import QualityPopover from 'components/quality-popover'
import RepoCard from 'components/repo-card'
import SearchPageSearchBox from 'components/search-page-search-box'
import SortSection from 'components/sort-section'
import SiteBanner from 'components/site-banner'
import { length, some } from '@code.gov/cautious'

export default class SearchPage extends React.Component {

  componentDidMount () {
    refreshView();
    if (!this.props.filterData) this.props.saveFilterData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== this.props || JSON.stringify(nextState) !== this.state
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  get repoCounter() {
    let textContent
    if (this.props.filteredResults) {
      const total = this.props.total;
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
        <div className="card-container">
          <QualityPopover />
          <ul className="card-ul">
            {filteredResults.map(repo => <RepoCard key={repo.repoID} repo={repo}/>)}
          </ul>
        </div>
      )
    }
  }

  updatePage(newPage) {
    scrollToTopOfResults()
    this.props.updatePage(newPage)
  }

  render() {
    const numPages = Math.ceil(this.props.total / this.props.selectedPageSize)
    return (
      <div className="search-results-content">
        <SiteBanner title='Search Results' />
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

            {some(this.props.languages) && (
            <FilterBox title="Language" options={this.props.languages} onChange={values => this.onFilterBoxChange('languages', values)} />
            )}

            {some(this.props.agencies) && (
            <FilterBox title="Federal Agency" options={this.props.agencies} onChange={values => this.onFilterBoxChange('agencies', values)} />
            )}

            {some(this.props.licenses) && (
            <FilterBox title="License" options={this.props.licenses} onChange={values => this.onFilterBoxChange('licenses', values)} />
            )}

            {some(this.props.usageTypes) && (
            <FilterBox title="Usage Type" options={this.props.usageTypes} onChange={values => this.onFilterBoxChange('usageTypes', values)} />
            )}

          </div>
          <div id="filter-results-section">
            <SortSection
              options={this.props.sortOptions}
              onSortChange={this.props.onSortChange}
            />
            <div className="card-list">
              {this.reposContainer}
              {numPages > 0 && <Pagination count={this.props.total} pagesize={this.props.selectedPageSize} page={this.props.selectedPage} updatePage={::this.updatePage} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
