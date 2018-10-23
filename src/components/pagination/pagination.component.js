// https://reactjs.org/docs/forms.html

import React, { Component, Fragment } from 'react'

import { range } from '@code.gov/cautious'

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
    console.log("starting handleNext")
    this.handleChangePage(this.props.page + 1)
  }

  handlePrevious() {
    console.log("starting handlePrevious")
    this.handleChangePage(this.props.page - 1)
  }

  get isLastPage() {
    return this.props.page === Math.ceil(this.props.count / this.props.pagesize) - 1
  }

  get leftIcon() {
    if (this.props.page === 0) {
      return <span aria-label="Previous"><i className="icon icon-angle-circled-left"></i> Prev</span>
    } else if (this.props.page > 0) {
      return <a><i className="icon icon-angle-circled-up"></i> Prev</a>
    }
  }

  get rightIcon() {
    if (this.isLastPage) {
      return <span>Next <i className="icon icon-angle-circled-right"></i></span>
    } else {
      return <a onClick={::this.handleNext}>Next <i className="icon icon-angle-circled-right"></i></a>
    }
  }

  getSummary({ count, minPageIndex, maxPageIndex}) {
    if (count > 0) {
      return <Fragment>Results <strong>{minPageIndex + '-' + maxPageIndex}</strong> of <strong>{count}</strong></Fragment>
    } else {
      return <Fragment>No results found.</Fragment>
    }
  }

  render() {

    const { count, page, pagesize } = this.props
    console.log("pagination count, page, pagesize", [count, page, pagesize])

    /*
      ex: if on second page when 10 items per page
      minPageIndex is 10 because 1 * 10
      This is displayed as 11 however because it's the 11th item in the array
    */
    const minPageIndex = page * pagesize
    /*
      ex: if on second page when 10 items per page
      maxPageIndex is 20, which is 11 + 9
    */
    const maxPageIndex = minPageIndex + (pagesize - 1)

    const pagecount = Math.ceil(count / pagesize)

    const summary = this.getSummary({ count, minPageIndex, maxPageIndex })

    console.log("range page:", page, range(pagecount + 1))

    return (
      <nav role="navigation" aria-label="Pagination Navigation" tabIndex="0">
        <ul className="ngx-pagination">
          <div className="repo-list-summary-wrapper" tabIndex="0">
            <p className="repo-list-summary">{summary}</p>
          </div>
          <li className={'pagination-previous ' + (page === 0 ? 'className="disabled" ' : '')} tabIndex="0">
            {this.leftIcon}
          </li>
          {range(pagecount + 1).map(i => {
            let current = i === this.props.page
            let label = i + 1
            console.log("label:", label)
            let className = 'page'
            if (i === 0) className += ' first'
            if (current) className += ' current'
            return (
              <li className={className} key={i} tabIndex='0'>
                {current && <span aria-label={`Current Page ${label}`} aria-current="true">{label}</span> }
                {!current && <a aria-label={`Go to page ${label}`} onClick={() => this.handleChangePage(i)}>{label}</a> }
              </li>
            )
          })}
          <li className={'pagination-next' + (this.isLastPage ? ' disabled' : '')} tabIndex="0">
            {this.rightIcon}
          </li>
        </ul>
      </nav>
    )
  }

}
