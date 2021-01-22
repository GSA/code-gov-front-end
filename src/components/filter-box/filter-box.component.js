import React, { Component } from 'react'

export default class FilterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll: true,
      accordionExpand: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleClickToggle = this.handleClickToggle.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  get filterOptions() {
    return (
      <>
        {JSON.parse(this.props.options).map((option, index) => {
          const optionName = option.name
          const optionValue = option.value
          const optionChecked = option.checked
          const hidden = {}
          if (this.state.showAll) {
            hidden.hidden = false
          } else {
            hidden.hidden = true
          }
          if (index >= 4) {
            return (
              <div className="usa-checkbox" {...hidden} key={optionName}>
                <input
                  type="checkbox"
                  className="usa-checkbox__input"
                  id={optionValue}
                  value={optionValue}
                  onChange={this.handleChange}
                  checked={optionChecked}
                />
                <label
                  className="usa-checkbox__label font-body-2xs text-base-dark"
                  htmlFor={optionValue}
                >
                  <span>{optionName}</span>
                </label>
              </div>
            )
          }
          return (
            <div className="usa-checkbox" key={optionName}>
              <input
                type="checkbox"
                className="usa-checkbox__input"
                id={optionValue}
                value={optionValue}
                onChange={this.handleChange}
                checked={optionChecked}
              />
              <label
                className="usa-checkbox__label font-body-2xs text-base-dark"
                htmlFor={optionValue}
              >
                <span>{optionName}</span>
              </label>
            </div>
          )
        })}
      </>
    )
  }

  handleChange(event) {
    if (event.target.tagName.toLowerCase() === 'input') {
      const type = event.target.checked ? 'checked' : 'unchecked'
      const value = event.target.value
      this.props.onChange({ type, value })
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
    } else if (event.keyCode === 13) {
      const showAll = !this.state.showAll
      this.setState({ showAll })
    }
  }

  handleKeyUp(event) {
    if (event.keyCode === 32) {
      const showAll = !this.state.showAll
      this.setState({ showAll })
    }
  }

  handleClickToggle(event) {
    event.preventDefault()
    const showAll = !this.state.showAll
    this.setState({ showAll })
  }

  handleExpand(event) {
    const accordionExpand = !this.state.accordionExpand
    this.setState({ accordionExpand })
  }

  render() {
    const title = this.props.title
    const accordionID = this.props.title.replace(/\s+/g, '-').toLowerCase()
    const accordionContent = {}
    if (this.state.accordionExpand) {
      accordionContent.hidden = false
    } else {
      accordionContent.hidden = true
    }
    const showMoreButton = JSON.parse(this.props.options).length > 4
    const paddingBottom = showMoreButton ? 'padding-bottom-105' : 'padding-bottom-05'

    return (
      <div className="usa-accordion border-base-light border-1px tablet-lg:margin-bottom-2 margin-bottom-0">
        <div className="usa-accordion__heading">
          <button
            className="usa-accordion__button font-heading-md text-base-darker"
            aria-expanded={this.state.accordionExpand}
            aria-controls={accordionID}
            id={`${accordionID}-button`}
            onClick={this.handleExpand}
          >
            {title}
          </button>
        </div>
        <div
          id={accordionID}
          className={`usa-accordion__content usa-prose border-top-1px border-base-light ${paddingBottom}`}
          {...accordionContent}
        >
          <form className="usa-form maxw-none">
            <fieldset className="usa-fieldset" aria-labelledby={`${accordionID}-button`}>
              <legend className="usa-sr-only" aria-labelledby={`${accordionID}-button`} />
              {this.filterOptions}
            </fieldset>
          </form>
          {showMoreButton ? (
            <div>
              <span
                className="moreLessToggle text-underline text-primary font-body-2xs"
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onClick={this.handleClickToggle}
                role="button"
                tabIndex="0"
              >
                {this.state.showAll ? 'Show less' : 'Show more'}
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
