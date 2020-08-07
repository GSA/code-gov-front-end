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
    const mobileMenu = this.props.mobileMenu
    this.props.onSubmit(this.state.value)
    event.preventDefault()
    this.setState({ value: '' })
    this.props.toggleMobileMenu(mobileMenu)
  }

  render() {
    return (
      <>
        <form className="usa-search" role="search" onSubmit={::this.handleSubmit}>
          <input
            aria-label="search"
            className="usa-input radius-left-md border-1px border-right-0 border-base-lighter font-body-3xs"
            onChange={::this.handleChange}
            placeholder="Search Projects..."
            type="search"
            value={this.state.value}
          />
          <button className="usa-button font-body-sm" type="submit">
            <span className="usa-search__submit-text">Go</span>
          </button>
        </form>
      </>
    )
  }
}
