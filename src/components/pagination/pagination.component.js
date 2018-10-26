// https://reactjs.org/docs/forms.html

import React, { Component, Fragment } from 'react'

import { endsWith, equal, last, penultimate, range } from '@code.gov/cautious'

export default class Pagination extends Component {

  constructor(props) {
    super(props);
  }

  handleChangePage(newPage) {
    console.log("starting handleChangePage with:", newPage)
    if (this.props.updatePage) {
      this.props.updatePage(newPage)
    } else {
      console.warn("You did not assign an updatePage function to the instance of the pagination component.")
    }
  }

  handleNext() {
    this.handleChangePage(Number(this.props.page) + 1)
  }

  handlePrevious() {
    this.handleChangePage(Number(this.props.page) - 1)
  }

  get isLastPage() {
    return equal(this.props.page,  Math.ceil(this.props.count / this.props.pagesize))
  }

  get leftIcon() {
    if (equal(this.props.page, 1)) {
      return <span aria-label="Previous"><i className="icon icon-angle-circled-left"></i> Prev</span>
    } else if (Number(this.props.page) > 1) {
      return <a onClick={::this.handlePrevious}><i className="icon icon-angle-circled-up"></i> Prev</a>
    }
  }

  get rightIcon() {
    if (this.isLastPage) {
      return <span>Next <i className="icon icon-angle-circled-right"></i></span>
    } else {
      return <a onClick={::this.handleNext}>Next <i className="icon icon-angle-circled-right"></i></a>
    }
  }

  getSummary({ count, minItemIndex, maxItemIndex}) {
    if (count > 0) {
      return <Fragment>Results <strong>{minItemIndex + '-' + maxItemIndex}</strong> of <strong>{count}</strong></Fragment>
    } else {
      return <Fragment>No results found.</Fragment>
    }
  }

  render() {

    const { count, pagesize } = this.props
    const page = Number(this.props.page)
    console.log("pagination count, page, pagesize", [count, page, pagesize])

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
    const maxItemIndex = minItemIndex + pagesize >= count ? count : minItemIndex + pagesize - 1

    const pagecount = Math.ceil(count / pagesize)

    const summary = this.getSummary({ count, minItemIndex, maxItemIndex })

    console.log("range page:", page, range(pagecount + 1))

    const pageIndexes = range(pagecount)
      .map(n => n + 1) // convert from starting at 0 to 1

    const pageCount = pageIndexes.length

    let displayPages = []
    try {

      const ultimate = last(pageIndexes)
      const left = page - 1
      const right = page + 1

      if (pageCount <= 7) {
        displayPages = range(pagecount + 1).map(n => n + 1)
      } else if (1 <= page && page <= 4) {
        displayPages = [1, 2, 3, 4, 5, 'right-ellipsis', ultimate]
      } else if (4 < page && right < ultimate - 2) {
        displayPages = [1, 'left-ellipsis', left, page, right, 'right-ellipsis', ultimate]
      } else if (page >= ultimate - 3) {
        displayPages = [1, 'left-ellipsis', ultimate-4, ultimate-3, ultimate-2, ultimate-1, ultimate]
      }

      console.log("displayPages:", displayPages)

    } catch (error) {
      console.warn(error);
    }

    return (
      <nav role="navigation" aria-label="Pagination Navigation" tabIndex="0">
        <ul className="ngx-pagination">
          <div className="repo-list-summary-wrapper" tabIndex="0">
            <p className="repo-list-summary">{summary}</p>
          </div>
          <li className={'pagination-previous ' + (page === 0 ? 'className="disabled" ' : '')} tabIndex="0">
            {this.leftIcon}
          </li>
          {displayPages.map(i => {
            const ellipsis = endsWith(i, 'ellipsis')
            let current = equal(i, page)
            let className = 'page'
            if (i === 1) className += ' first'
            if (current) className += ' current'
            return (
              <li className={className} key={i} tabIndex='0'>
                {ellipsis && <span>...</span> }
                {current && <span aria-label={`Current Page ${i}`} aria-current="true">{i}</span> }
                {!ellipsis && !current && <a aria-label={`Go to page ${i}`} onClick={() => this.handleChangePage(i)}>{i}</a> }
              </li>
            )
          })}
          <li className={'pagination-next' + (this.isLastPage ? ' disabled' : '')} tabIndex="6">
            {this.rightIcon}
          </li>
        </ul>
      </nav>
    )
  }

}
