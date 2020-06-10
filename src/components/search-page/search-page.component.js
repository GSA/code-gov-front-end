import Breadcrumbs from 'components/breadcrumbs'
import FilterBoxes from 'components/filter-boxes'
import FilterTags from 'components/filter-tags'
import Pagination from 'components/pagination'
import QualityPopover from 'components/quality-popover'
import QuickSearchBox from 'components/quick-search-box'
import RepoCard from 'components/repo-card'
import SiteBanner from 'components/site-banner'
import SortSection from 'components/sort-section'
import React from 'react'
import { refreshView, scrollToTopOfResults } from 'utils/other'

export default class SearchPage extends React.Component {
  componentDidMount() {
    refreshView()
    if (!this.props.filterData) this.props.saveFilterData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== this.props || JSON.stringify(nextState) !== this.state
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  get repoCounter() {
    let textContent = 'Loading Repositories'
    if (this.props.filteredResults) {
      const total = this.props.total
      const query = this.props.query
      if (total === 0) {
        textContent = `We found no repositories for "${query}"`
      } else if (total === 1) {
        textContent = `We found 1 repository for "${query}"`
      } else if (total >= 2) {
        textContent = `Top ${total} repositories for "${query}"`
      }
    }
    return <h3 className="repos-count width-three-quarters">{textContent}</h3>
  }

  get reposContainer() {
    const filteredResults = this.props.filteredResults
    console.log('starting reposContainers with filteredResults:', filteredResults)

    if (filteredResults) {
      return (
        <div>
          <QualityPopover />
          <ul className="usa-card-group padding-top-3">
            {filteredResults.map(repo => (
              <RepoCard key={repo.repoID} repo={repo} />
            ))}
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
        <SiteBanner title="Search Results" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Search Results' }]} />
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div className="margin-top-2 tablet:grid-col-3">
              <QuickSearchBox value={this.props.searchParams.query} />
            </div>
            {this.repoCounter}
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div id="filter-boxes-section" className="tablet:grid-col-3 margin-top-4">
              <h2>Filter</h2>

              <FilterBoxes
                boxes={this.props.boxes}
                config={[
                  ['Language', 'languages'],
                  ['Federal Agency', 'agencies'],
                  ['Licenses', 'licenses'],
                  ['Usage Types', 'usageTypes']
                ]}
                onFilterBoxChange={::this.onFilterBoxChange}
              />
            </div>
            <div id="filter-results-section" className=" tablet:grid-col-9">
              <SortSection
                options={this.props.sortOptions}
                onSortChange={this.props.onSortChange}
              />
              <FilterTags filters={this.props.filterTags} onClick={::this.props.onFilterTagClick} />
              <div className="card-list">
                {this.reposContainer}
                {numPages > 0 && (
                  <Pagination
                    count={this.props.total}
                    pagesize={this.props.selectedPageSize}
                    page={this.props.selectedPage}
                    updatePage={::this.updatePage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
