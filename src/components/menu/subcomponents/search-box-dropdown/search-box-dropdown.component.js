import React, { Component, Fragment } from 'react'

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    event.preventDefault()
    this.setState({ value: ''})
  }

  hideSearchDropdown() {
    this.setState({ value: ''})
    this.props.hideSearchDropdown()
  }

  render() {
    return (
      <div className={'search-box' + (this.props.searchDropdown ? ' active' : '')}>
        <a className="close-search-box-button" onClick={::this.hideSearchDropdown}>
          <i className="icon icon-cancel"></i>
        </a>
        <form className="search-form" onSubmit={::this.handleSubmit}>
          <div className="search-input-wrapper">
            <div className="search-input-and-button-wrapper">
              <input
                autocomplete="off"
                className="no-search-icon-on-mobile"
                title="Search Code.gov"
                type="search"
                placeholder="Search Projects..."
                onChange={::this.handleChange}
                value={this.state.value}
              />
              <button className="go">Go</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}