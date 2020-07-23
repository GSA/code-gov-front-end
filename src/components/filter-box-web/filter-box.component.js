import React, { Component, Fragment } from 'react'

export default class FilterBoxWeb extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  get filterOptions() {
    // const rawOptions = this.props.options
    // let parsedOptions = null
    // try {
    //     parsedOptions = JSON.parse(rawOptions)
    //   } catch (error) {
    //     console.error('[filter-box] failed to parse rawOptions:', rawOptions)

    //     if (rawOptions.contains('object')) {
    //       console.error(
    //         'It seems that you might have put in an object.  Make sure to convert your object to a JSON string with JSON.stringify'
    //       )
    //     }

    //     throw error
    //   }

    //   if (parsedOptions) {
    //     parsedOptions.map(option => {
    //       if (_typeof(option) === 'object' && option.name && option.value) {
    //         return {
    //           name: option.name,
    //           value: option.value,
    //           checked: !!option.checked
    //         }
    //       }
    //       return {
    //         name: option,
    //         value: option,
    //         checked: false
    //       }
    //     })
    //   } else {
    //     this.props.options = []
    //   }

    return (
      <>
        {JSON.parse(this.props.options).map((option, index) => {
          let className = ''
          // const optionName = JSON.stringify(option.name)
          // const optionValue = JSON.stringify(option.value)
          const optionName = option.name
          const optionValue = option.value
          const optionChecked = option.checked
          // let hidden = ''
          // if (index >= 4 && _this2.showAll) className += 'hideOnCollapsed'
          // if (index >= 4 && _this2.showAll) hidden += 'hidden'
          if (option.checked) className += ' checked'
          return (
            <div className={`usa-checkbox ${className}`}>
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
    console.log(`handling change:${event.target.tagName}`)
    console.log(`type:${event.target.checked}`)
    console.log(`value:${event.target.value}`)
    if (event.target.tagName.toLowerCase() === 'input') {
      const type = event.target.checked ? 'checked' : 'unchecked'
      const value = event.target.value
      this.props.eventChange({ type, value })
    }
  }

  render() {
    const title = this.props.title
    return (
      <>
        <div className="usa-accordion__heading">
          <button
            className="usa-accordion__button font-heading-md text-base-darker"
            aria-expanded="true"
            aria-controls={title}
            id={`button-${title}`}
          >
            {title}
          </button>
        </div>
        <div id={title} className="usa-accordion__content usa-prose">
          <form className="usa-form maxw-none">
            <fieldset className="usa-fieldset" aria-labelledby={`button-${title}`}>
              <legend className="usa-sr-only" aria-labelledby={`button-${title}`} />
              {this.filterOptions}
              {JSON.parse(this.props.options).length > 4 ? (
                <div>
                  <span
                    className="moreLessToggle text-underline text-primary font-body-2xs"
                    role="button"
                    tabIndex="0"
                  >
                    Show more
                  </span>
                </div>
              ) : (
                ''
              )}
            </fieldset>
          </form>
        </div>
      </>
    )
  }
}
