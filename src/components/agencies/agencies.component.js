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
import AgencyCard from 'components/agency-card'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import { some } from '@code.gov/cautious'
import { connect } from 'react-redux'
import syncUrlSearchParams from 'actions/sync-url-search-params'
import { getReposCount } from '../../utils/repos-count'

class Agencies extends React.Component {
  componentDidMount() {
    refreshView()
    if (!this.props.filterData) {
      this.props.saveFilterData()
      console.log('this.props.filterData',this.props.filterData)
    }
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()

    this.props.onFilterBoxChange(category, values)
  }

  get reposContainer() {
    let filt = []

    if (this.props.boxes && this.props.boxes.agencies) {
      filt = this.props.boxes.agencies.reduce((acc, val) => {
        if (val.checked) acc.push(val.value)
        return acc
      }, [])
    }
    if (some(this.props.AgencyList)) {
      try {
        const filters = this.props.filterTags
        return (
          <div>
            <FilterTags filters={this.props.filterTags} onClick={::this.props.onFilterTagClick} />
            <div />
            <ul className="usa-card-group padding-top-3">
              {this.props.AgencyList.map(agency => {
                if (filt.length) {
                  if (filt.indexOf(agency.acronym) !== -1) {
                    return <AgencyCard key={agency.id} agency={agency} />
                  }

                  return
                } 
                return <AgencyCard key={agency.id} agency={agency} />
                
              })}
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
    // const numPages = Math.ceil(this.props.total / this.props.selectedPageSize)
    console.log('props.boxes', this.props.boxes)
    return (
      <main className="search-results-content" id="main-content">
        <SiteBanner title="Agencies" />
        {/* <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Agencies' }]} /> */}
        <div className="grid-container grid-row tablet-lg:margin-top-4 margin-top-2">
          <div className="grid-row grid-gap" />
        </div>
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div id="filter-boxes-section" className="tablet-lg:grid-col-3">
              <FilterBoxes
                boxes={this.props.boxes}
                config={[['Federal Agency', 'agencies']]}
                onFilterBoxChange={::this.onFilterBoxChange}
              />
            </div>
            <div id="filter-results-section" className=" tablet-lg:grid-col-9">
              <div className="usa-alert usa-alert--info usa-alert--slim">
                <div className="usa-alert__body">
                  <p className="usa-alert__text">
                    For inquiries into agency source code, please refer to the{' '}
                    <a href="https://github.com/GSA/code-gov/tree/master/docs/CoPMeetingMins/SupportingDocs">
                      agency liaison list
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="card-list">{this.reposContainer}</div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(null, { syncUrlSearchParams })(Agencies)
