import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FilterBoxes from 'components/filter-boxes'
import FilterTags from 'components/filter-tags'
import Pagination from 'components/pagination'
import QualityPopover from 'components/quality-popover'
import QuickSearchBox from 'components/quick-search-box'
import SiteBanner from 'components/site-banner'
import SortSection from 'components/sort-section'
import RepoCard from 'components/repo-card'
import { isChecked } from 'utils/filtering'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import { parseLocation } from 'utils/url-parsing'
import { length, some } from '@code.gov/cautious'


export default class BrowseProjects extends React.Component {

  componentDidMount () {
    refreshView()
    if (!this.props.filterData) this.props.saveFilterData()
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

  get reposContainer() {
    if (some(this.props.repos)) {
      try {
        return (
          <div className="card-container">
            <QualityPopover />
            <ul className="card-ul">
              {this.props.repos.map(repo => <RepoCard key={repo.repoID} repo={repo}/>)}
            </ul>
          </div>
        )
      } catch (error) {
        console.error("reposContainer error with this.props.repos", this.props.repos)
        throw error
      }
    }
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  updatePage(newPage) {
    scrollToTopOfResults()
    this.props.updatePage(newPage)
  }

  render() {
    const numPages = Math.ceil(this.props.total / this.props.selectedPageSize)
    return (
      <div className="search-results-content">
        <SiteBanner title='Browse Projects' />
        <div className="indented" ref="crumbs">
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li>Browse Projects</li>
          </ul>
        </div>
        <div className="search-results-header">
            <div className="indented">
              <div className="width-quarter">
                <QuickSearchBox />
              </div>
              {this.repoCounter}
            </div>
          </div>
        <div className="indented">
          <div id="filter-boxes-section">
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
          <div id="filter-results-section">
            <SortSection
              options={this.props.sortOptions}
              onSortChange={this.props.onSortChange}
            />
            <FilterTags filters={this.props.filterTags} onClick={::this.props.onFilterTagClick} />
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
