import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Breadcrumbs from 'components/breadcrumbs'
import FilterBoxes from 'components/filter-boxes'
import FilterTags from 'components/filter-tags'
import Pagination from 'components/pagination'
import QualityPopover from 'components/quality-popover'
import QuickSearchBox from 'components/quick-search-box'
import SiteBanner from 'components/site-banner'
import SortSection from 'components/sort-section'
import RepoCard from 'components/repo-card'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import { some } from '@code.gov/cautious'
import { getReposCount } from '../../utils/repos-count'

export default class BrowseProjects extends React.Component {
  componentDidMount() {
    refreshView()
    if (!this.props.filterData) this.props.saveFilterData()
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  get repoCounter() {
    const { total } = this.props

    const messages = {
      default: 'Loading Repositories',
      '0': 'No Repositories',
      '1': '1 Repository',
      '2': `[VALUE] Repositories`
    }

    return getReposCount(
      total,
      messages,
      'repos-count tablet-lg:grid-col-9 grid-col-12 tablet:grid-col-4 font-heading-lg text-bold tablet:margin-y-105 margin-top-3 margin-bottom-0'
    )
  }

  get reposContainer() {
    if (some(this.props.repos)) {
      try {
        return (
          <div>
            <FilterTags filters={this.props.filterTags} onClick={::this.props.onFilterTagClick} />
            <div>
              <QualityPopover />
            </div>
            <ul className="usa-card-group padding-top-3">
              {this.props.repos.map(repo => (
                <RepoCard key={repo.repoID} repo={repo} />
              ))}
            </ul>
          </div>
        )
      } catch (error) {
        console.error('reposContainer error with this.props.repos', this.props.repos)
        throw error
      }
    }
  }

  updatePage(newPage) {
    scrollToTopOfResults()
    this.props.updatePage(newPage)
    document.getElementsByClassName('project-link')[0].focus()
  }

  render() {
    const numPages = Math.ceil(this.props.total / this.props.selectedPageSize)
    return (
      <main className="search-results-content" id="main-content">
        <SiteBanner title="Projects" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Projects' }]} />
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div className="margin-top-1 grid-col-12 tablet-lg:grid-col-3 tablet:grid-col-8">
              <QuickSearchBox />
            </div>
            {ReactHtmlParser(this.repoCounter)}
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div
              id="filter-boxes-section"
              className="tablet-lg:grid-col-3 tablet-lg:margin-top-4 margin-top-3"
            >
              <h2 className="tablet-lg:margin-bottom-4 margin-bottom-105">Filter</h2>

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
            <div id="filter-results-section" className=" tablet-lg:grid-col-9">
              <SortSection
                options={this.props.sortOptions}
                onSortChange={this.props.onSortChange}
              />
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
      </main>
    )
  }
}
