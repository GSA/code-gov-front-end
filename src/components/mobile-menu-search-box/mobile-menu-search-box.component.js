import React from 'react'

export default class MobileMenuSearchBoxComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    event.preventDefault()
    this.setState({ value: '' })
  }

  render() {
    return (
      <div className="margin-x-2">
        <form className="usa-search" role="search" onSubmit={::this.handleSubmit}>
          <input
            aria-label="search"
            className="usa-input radius-left-md border-0 font-body-sm"
            onChange={::this.handleChange}
            placeholder="Search Projects..."
            type="search"
            value={this.state.value}
          />
          <button className="usa-button font-body-sm" type="submit">
            <span className="usa-search__submit-text">Go</span>
          </button>
        </form>
      </div>
    )
  }
}
