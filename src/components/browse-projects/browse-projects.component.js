import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FilterBox from 'components/filter-box'
import Pagination from 'components/pagination'
import QualityPopover from 'components/quality-popover'
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

    const {
      agencies,
      languages,
      licenses,
      page,
    } = parseLocation(this.props.location)

   // if (!equal(this.props.repos.params)

    // triggers initial load
    if (!this.props.repos) {
      this.props.onFilterBoxChange({
        agencies: this.props.agencies,
        languages: this.props.languages,
        licenses: this.props.licenses,
        usageTypes: this.props.usageTypes
      })
    }
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

  get reposContainer() {
    if (Array.isArray(this.props.repos)) {
      return (
        <div className="card-container">
          <QualityPopover />
          <ul className="card-ul">
            {this.props.repos.map(repo => <RepoCard key={repo.repoID} repo={repo}/>)}
          </ul>
        </div>
      )
    }
  }

  onFilterBoxChange(category, values) {

    scrollToTopOfResults()

    const filters = {
      agencies: this.props.agencies.filter(isChecked),
      languages: this.props.languages.filter(isChecked),
      licenses: this.props.licenses.filter(isChecked),
      usageTypes: this.props.usageTypes.filter(isChecked)
    }

    filters[category] = values

    console.warn("cat val:", category, values)
    console.warn("filters:", filters)
    this.props.onFilterBoxChange(filters)
  }

  removeFilterTag(selectedTag) {
    console.log("starting removeFilterTag")
    const filterTags = this.state.filterTags.filter(tag => tag !== selectedTag);
    this.setState({ filterTags })
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
              <div className="width-quarter"></div>
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
