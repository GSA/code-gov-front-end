import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { map, some } from '@code.gov/cautious'
import FilterBoxes from 'components/filter-boxes'
import FilterTags from 'components/filter-tags'
import Pagination from 'components/pagination'
import SiteBanner from 'components/site-banner'
import TaskCard from 'components/task-card'
import { scrollToTopOfResults } from 'utils/other'
import { isChecked } from 'utils/filtering'

export default class OpenTasks extends React.Component {

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  componentDidMount() {
    const boxes = this.props.boxes || {}
    if (Object.keys(boxes).length === 0) this.props.saveFilterData()
  }

  get counter() {
    const { total } = this.props
    let textContent
    if (total) {
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

  onFilterBoxChange(category, values) {
    scrollToTopOfResults()
    this.props.onFilterBoxChange(category, values)
  }

  updatePage(newPage) {
    scrollToTopOfResults()
    this.props.updatePage(newPage)
  }

  render() {
    const total = this.props.total || 0
    const numPages = Math.ceil(this.props.total / this.props.selectedPageSize)
    return (
      <div className="search-results-content">
        <SiteBanner title='Open Tasks' />
        <div className="indented">
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

            <FilterBoxes
              boxes={this.props.boxes}
              config={[
                ['Language', 'languages'],
                ['Federal Agency', 'agencies'],
                ['Skill Level', 'skillLevels'],
                ['Time Required', 'timeRequired'],
                ['Type', 'categories']
                ]}
              onFilterBoxChange={::this.onFilterBoxChange}
            />

          </div>
          <div id="filter-results-section">
            <div className="sort-section">
              <h2>
                <span>Explore Open Tasks</span>
              </h2>
            </div>
            <FilterTags filters={this.props.filterTags} onClick={::this.props.onFilterTagClick} />
            <div className="card-list">
              <div className="card-container">
                <ul className="card-ul">
                  {map(this.props.tasks, task => {
                    return <TaskCard key={task.id} task={task} />
                  })}
                </ul>
              </div>
              {numPages > 0 && <Pagination count={this.props.total} pagesize={this.props.selectedPageSize} page={this.props.selectedPage} updatePage={::this.updatePage} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
