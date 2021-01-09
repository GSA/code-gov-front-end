import React, { Component, Fragment } from 'react'

export default class SideSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLeft: props.position === 'left',
      placeholder: props.placeholder || 'Search Code.gov...',
      affiliate: props.affiliate || 'code.gov',
      searchAction: props.searchAction || 'https://search.usa.gov/search'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const isLeft = this.state.isLeft
    const searchAffiliate = this.state.affiliate
    const searchAction = this.state.searchAction
    const searchPlaceholder = this.state.placeholder

    return (
      <form
        acceptCharset="UTF-8"
        target="_blank"
        action={searchAction}
        id="search_form"
        method="get"
        className={`side-search ${isLeft ? 'side-search--left' : ''}`}
      >
        <input name="utf8" type="hidden" value="✓" />
        <input id="affiliate" name="affiliate" type="hidden" value={searchAffiliate} />
        <div role="search">
          {(() => {
            if (isLeft) {
              return (
                <Fragment>
                  <button className="usa-button" name="commit" type="submit">
                    <span className="usa-sr-only">Search</span>
                  </button>
                  <label className="usa-sr-only" htmlFor="query">
                    Search small
                  </label>
                  <input className="usa-input" id="query" type="search" name="query" />
                </Fragment>
              )
            }
            return (
              <Fragment>
                <label className="usa-sr-only" htmlFor="query">
                  Search small
                </label>
                <input
                  className="usa-input"
                  id="query"
                  type="search"
                  name="query"
                  placeholder={searchPlaceholder}
                />
                <button className="usa-button" name="commit" type="submit">
                  <span className="usa-sr-only">Search</span>
                </button>
              </Fragment>
            )
          })()}
        </div>
      </form>
    )
  }
}
