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
      <form className="usa-search" role="search" onSubmit={::this.handleSubmit}>
        <input
          aria-label="search"
          className="usa-input"
          onChange={::this.handleChange}
          placeholder="Search Projects..."
          type="search"
          value={this.state.value}
        />
        <button className="usa-button" type="submit">
          <span className="usa-search__submit-text">Search</span>
        </button>
      </form>
    )
  }
}
