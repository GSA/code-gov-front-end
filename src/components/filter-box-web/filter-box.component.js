import React, { Component, Fragment } from 'react'

export default class FilterBoxWeb extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  get filterOptions() {
    return (
      <>
        {JSON.parse(this.props.options).map((option, index) => {
          let className = ''
          const optionName = option.name
          const optionValue = option.value
          const optionChecked = option.checked
          const hidden = {}
          if (this.state.showAll) {
            hidden.hidden = false
          } else {
            hidden.hidden = true
          }
          // let hidden = ''
          if (option.checked) className += ' checked'
          if (index >= 4) className += 'hideOnCollapsed'
          if (index >= 4) {
            return (
              <div className={`usa-checkbox ${className}`} {...hidden}>
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

  // componentDidMount() {
  //   let showFields = true
  //   if (document.querySelector('.moreLessToggle')) {
  //     document.querySelectorAll('.moreLessToggle').forEach(button => button.addEventListener(
  //       'click',
  //       function(_) {
  //         console.log(showFields)
  //         // _this3.toggleState()
  //         if (showFields) {
  //           console.log(`coming into true: ${showFields}`)
  //           showFields = !showFields
  //           document.querySelectorAll('.hideOnCollapsed').forEach(field => {
  //             field.setAttribute('hidden', 'true')
  //           })
  //           document.querySelector('.moreLessToggle').innerHTML = 'Show more'
  //           console.log(`exiting from true as :${showFields}`)
  //         } else if (showFields === undefined) {
  //           console.log(`coming into undefined: ${showFields}`)
  //           showFields = true
  //           document.querySelectorAll('.hideOnCollapsed').forEach(field => {
  //             field.removeAttribute('hidden')
  //           })
  //           document.querySelector('.moreLessToggle').innerHTML = 'Show less'
  //           console.log(`exiting from undefined as :${showFields}`)
  //         } else {
  //           console.log(`coming into false: ${showFields}`)
  //           showFields = !showFields
  //           document.querySelectorAll('.hideOnCollapsed').forEach(field => {
  //             field.removeAttribute('hidden')
  //           })
  //           document.querySelector('.moreLessToggle').innerHTML = 'Show less'
  //           console.log(`exiting from false as :${showFields}`)
  //         }
  //       },
  //       false
  //     ))
  //   }
  // }

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

  handleClick(event) {
    console.log(`handleClick:${  event.target}`)
    console.log(`this is:${  this}`)
    event.preventDefault()
    const showAll = !this.state.showAll
    this.setState({ showAll })
    // if (event.target.tagName.toLowerCase() === 'input') {
    //   const type = event.target.checked ? 'checked' : 'unchecked'
    //   const value = event.target.value
    //   this.props.eventChange({ type, value })
    // }
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
                <button
                  className="moreLessToggle text-underline text-primary font-body-2xs bg-white border-0 padding-0"
                  // role="button"
                  // tabIndex="0"
                  onClick={this.handleClick}
                >
                  {this.state.showAll ? 'Show less' : 'Show more'}
                </button>
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
