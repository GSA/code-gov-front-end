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
      <form className="search-form" onSubmit={::this.handleSubmit}>
        <div className="search-input-wrapper">
          <div className="search-input-and-button-wrapper">
            <input
              aria-label="search"
              onChange={::this.handleChange}
              placeholder={this.props.placeholder || 'Search Projects...'}
              ref={this.textInput}
              type={this.props.inputType || 'search'}
              value={this.state.value}
              data-testid="input-search-box"
            />
            <button className="go" data-testid="button-search-box">Go</button>
          </div>
        </div>
      </form>
    )
  }
}
