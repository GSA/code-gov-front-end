import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = { value: props.value || '' }
    this.textInput = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', event => {
      if (this.textInput.current === event.target) {
        if (this.props.onFocus) {
          this.props.onFocus()
        }
      } else if (this.props.onBlur) {
        this.props.onBlur()
      }
    })
  }

  // need to update value when props value changes
  componentDidUpdate(prevProps) {
    const value = this.props.value
    if (value !== prevProps.value) {
      this.setState({ value })
    }
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form className="usa-search" onSubmit={::this.handleSubmit} role="search">
        <label className="usa-sr-only" htmlFor="search-field">
          Search Projects
        </label>
        <input
          onChange={::this.handleChange}
          placeholder={this.props.placeholder || 'Search Projects...'}
          ref={this.textInput}
          type={this.props.inputType || 'search'}
          value={this.state.value}
          data-testid="input-search-box"
          className="usa-input text-italic text-center font-body-3xs radius-left-md borderless"
          id="search-field"
          name="search"
        />
        <button
          className="usa-button text-center font-body-sm"
          type="submit"
          data-testid="button-search-box"
        >
          <span className="usa-search__submit-text">Go</span>
        </button>
      </form>
    )
  }
}
