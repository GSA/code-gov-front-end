import React, { Component, Fragment } from 'react'
import { map, some } from '@code.gov/cautious'
import Autocomplete from 'components/autocomplete'
import SearchBox from 'components/search-box'
import client from 'api-client'

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAutocomplete: false,
      value: ''
    }
  }

  handleBlur() {
    this.setState({ showAutocomplete: false })
  }

  handleFocus() {
    this.setState({ showAutocomplete: true })
  }

  handleChange(value) {
    client.suggest(value, 5).then(terms => {
      const suggestions = map(terms, term => {
        return {
          text: term,
          to: `/search?query=${term}&page=1&size=10`
        }
      })
      this.setState({
        showAutocomplete: true,
        suggestions
      })
    })
  }

  handleSubmit(value) {
    this.setState({ value: ''})
    this.props.onSubmit(value)
    event.preventDefault()
  }

  hideSearchDropdown() {
    this.setState({ value: ''})
    this.props.hideSearchDropdown()
  }

  render() {
    return (
      <div className={'search-box show-w-gt-800' + (this.props.searchDropdown ? ' active' : '')}>
        <div style={{marginLeft: 'auto', position: 'relative', width: 'calc(36rem + 42px)'}}>
          <a className="close-search-box-button" onClick={::this.hideSearchDropdown}>
            <i className="icon icon-cancel"></i>
          </a>
          <SearchBox
            onBlur={::this.handleBlur}
            onChange={::this.handleChange}
            onFocus={::this.handleFocus}
            onSubmit={::this.handleSubmit}
            placeholder="Search Projects..."
          />
          {this.state.showAutocomplete && some(this.state.suggestions) && <Autocomplete options={this.state.suggestions} onClick={::this.handleSubmit}/>}
        </div>
      </div>
    )
  }
}