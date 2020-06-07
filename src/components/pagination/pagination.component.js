// https://reactjs.org/docs/forms.html
import React, { Component, Fragment } from 'react'
import { endsWith, equal, last, range } from '@code.gov/cautious'

export default class Pagination extends Component {
  constructor(props) {
    super(props)
  }

  get isLastPage() {
    return equal(this.props.page, Math.ceil(this.props.count / this.props.pagesize))
  }

  get leftIcon() {
    if (equal(this.props.page, 1)) {
      return (
        <span className="text-no-underline" aria-label="Previous">
          <i className="icon icon-angle-circled-left" /> Prev
        </span>
      )
    }
    if (Number(this.props.page) > 1) {
      return (
        <a className="text-no-underline" onClick={::this.handlePrevious}>
          <i className="icon icon-angle-circled-left" /> Prev
        </a>
      )
    }
  }

  get rightIcon() {
    if (this.isLastPage) {
      return (
        <span className="text-no-underline">
          Next <i className="icon icon-angle-circled-right" />
        </span>
      )
    }
    return (
      <a className="text-no-underline" onClick={::this.handleNext}>
        Next <i className="icon icon-angle-circled-right" />
      </a>
    )
  }

  getSummary({ count, minItemIndex, maxItemIndex }) {
    if (count > 0) {
      return (
        <Fragment>
          Results <strong>{`${minItemIndex}-${maxItemIndex}`}</strong> of <strong>{count}</strong>
        </Fragment>
      )
    }
    return <Fragment>No results found.</Fragment>
  }

  getDisplayPages() {
    const { count, pagesize } = this.props
    const page = parseInt(this.props.page, 10)
    const pagecount = Math.ceil(count / pagesize)
    const pageIndexes = range(pagecount).map(n => n + 1) // convert from starting at 0 to 1
    const pageCount = pageIndexes.length

    let displayPages = []

    try {
      const ultimate = last(pageIndexes)
      const left = page - 1
      const right = page + 1

      if (pageCount <= 7) {
        displayPages = pageIndexes
      } else if ([1, 2, 3, 4].includes(page)) {
        displayPages = [1, 2, 3, 4, 5, 'right-ellipsis', ultimate]
      } else if (page > 4 && right < ultimate - 2) {
        displayPages = [1, 'left-ellipsis', left, page, right, 'right-ellipsis', ultimate]
      } else if (page >= ultimate - 3) {
        displayPages = [
          1,
          'left-ellipsis',
          ultimate - 4,
          ultimate - 3,
          ultimate - 2,
          ultimate - 1,
          ultimate
        ]
      }
      return displayPages
    } catch (error) {
      console.warn(error)
    }
  }

  handleChangePage(newPage) {
    if (this.props.updatePage) {
      this.props.updatePage(newPage)
    } else {
      console.warn(
        'You did not assign an updatePage function to the instance of the pagination component.'
      )
    }
  }

  handleNext() {
    this.handleChangePage(Number(this.props.page) + 1)
  }

  handlePrevious() {
    this.handleChangePage(Number(this.props.page) - 1)
  }

  render() {
    const { count, pagesize } = this.props
    const page = Number(this.props.page)

    /*
      ex: if on second page when 10 items per page
      minItemIndex is 11 because (2-1) * 10 + 1
      This is displayed as 11 however because it's the 11th item in the array
    */
    const minItemIndex = (page - 1) * pagesize + 1
    /*
      ex: if on second page when 10 items per page
      maxItemIndex is 20, which is 11 + 9
    */
    const maxItemIndex =
      minItemIndex + (pagesize - 1) > count - 1 ? count : minItemIndex + (pagesize - 1)

    const summary = this.getSummary({ count, minItemIndex, maxItemIndex })
    const displayPages = this.getDisplayPages()

    return (
      <div className="pin-right padding-right-2px margin-top-neg-3 padding-bottom-8 margin-bottom-4">
        <nav
          role="navigation"
          aria-label="Pagination Navigation"
          tabIndex="0"
          className="margin-top-neg-3"
        >
          <ul className="display-inline-block">
            <div className="display-inline-block" tabIndex="0">
              <p className="display-inline-block">{summary}</p>
            </div>
            <li
              className={`display-inline-block padding-left-3 padding-right-1${
                page === 1 ? ' disabled' : ''
              }`}
              tabIndex="0"
            >
              {this.leftIcon}
            </li>
            {displayPages.map((i, index) => {
              const ellipsis = endsWith(i, 'ellipsis')
              const current = equal(i, page)
              let className = 'page'
              const tabIndex = index + 1
              if (i === 1) className += ' first'
              if (current) className += ' current'
              return (
                <li
                  className={`display-inline padding-left-1 padding-right-1 ${className}`}
                  key={i}
                >
                  {ellipsis && <span tabIndex={tabIndex}>...</span>}
                  {current && (
                    <span tabIndex={tabIndex} aria-label={`Current Page ${i}`} aria-current="true">
                      {i}
                    </span>
                  )}
                  {!ellipsis && !current && (
                    <a
                      data-testid={`component-pagination-page-link-${i}`}
                      tabIndex={tabIndex}
                      aria-label={`Go to page ${i}`}
                      className="text-no-underline"
                      onClick={() => this.handleChangePage(i)}
                    >
                      {i}
                    </a>
                  )}
                </li>
              )
            })}
            <li
              className={`display-inline padding-left-1 padding-right-1${
                this.isLastPage ? ' disabled' : ''
              }`}
              tabIndex="8"
            >
              {this.rightIcon}
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
