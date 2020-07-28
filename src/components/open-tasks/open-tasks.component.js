import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Breadcrumbs from 'components/breadcrumbs'
import { map } from '@code.gov/cautious'
import FilterBoxes from 'components/filter-boxes'
import FilterTags from 'components/filter-tags'
import Pagination from 'components/pagination'
import SiteBanner from 'components/site-banner'
import TaskCard from 'components/task-card'
import { scrollToTopOfResults } from 'utils/other'
import { getReposCount } from '../../utils/repos-count'

export default class OpenTasks extends React.Component {
  componentDidMount() {
    const boxes = this.props.boxes || {}
    if (Object.keys(boxes).length === 0) this.props.saveFilterData()
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  get counter() {
    const { total } = this.props

    return getReposCount(
      total,
      {
        default: 'Loading Tasks',
        '0': 'There are currently no open tasks.',
        '1': 'There is currently 1 open task.',
        '2': `There are [VALUE] open tasks.`
      },
      'repos-count font-heading-lg text-bold margin-y-105'
    )
  }

  updatePage(newPage) {
    scrollToTopOfResults()
    this.props.updatePage(newPage)
    document.getElementsByClassName('issue-link')[0].focus()
  }

  render() {
    const numPages = Math.ceil(this.props.total / this.props.selectedPageSize)
    return (
      <main className="search-results-content" id="main-content">
        <SiteBanner title="Open Tasks" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Open Tasks' }]} />
        <div className="grid-container">
          <div className="tablet:grid-col-3" />
          {ReactHtmlParser(this.counter)}
        </div>
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div id="filter-boxes-section" className="tablet-lg:grid-col-3 margin-top-105">
              <h2 className="margin-bottom-2">Filter</h2>

              <FilterBoxes
                boxes={this.props.boxes}
                config={[
                  // ['Language', 'languages'],
                  ['Federal Agency', 'agencies'],
                  ['Skill Level', 'skillLevels'],
                  ['Time Required', 'timeRequired'],
                  ['Type', 'categories']
                ]}
                onFilterBoxChange={::this.onFilterBoxChange}
              />
            </div>
            <div id="filter-results-section" className="tablet-lg:grid-col-9">
              <div className="grid-row tablet-lg:margin-top-105 margin-bottom-1 margin-top-4">
                <h2>Explore Open Tasks</h2>
              </div>
              <FilterTags filters={this.props.filterTags} onClick={::this.props.onFilterTagClick} />
              <div className="card-list">
                <ul className="usa-card-group usa-card-group margin-top-2">
                  {map(this.props.tasks, task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </ul>
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
