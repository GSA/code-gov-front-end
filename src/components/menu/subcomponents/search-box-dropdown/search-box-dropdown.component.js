import React, { Component } from 'react'
import { map, some } from '@code.gov/cautious'
import Autocomplete from 'components/autocomplete'
import SearchBox from 'components/search-box'
import client from 'api-client'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAutocomplete: false
    }
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  setStateIfMounted(state) {
    if (this.mounted) {
      this.setState(state)
    }
  }

  handleBlur() {
    this.setStateIfMounted({ showAutocomplete: false })
  }

  handleFocus() {
    this.setStateIfMounted({ showAutocomplete: true })
  }

  handleChange(value) {
    client.suggest(value, 5).then(terms => {
      const suggestions = map(terms, term => ({
        text: term,
        to: `/search?page=1&query=${term}&size=10&sort=best_match`
      }))
      this.setStateIfMounted({
        showAutocomplete: true,
        suggestions
      })
    })
  }

  handleSubmit(value) {
    this.props.onSubmit(value)
  }

  hideSearchDropdown() {
    this.props.hideSearchDropdown()
  }

  render() {
    return (
      <div className={`search-box show-w-gt-800${this.props.searchDropdown ? ' active' : ''}`}>
        <div style={{ marginLeft: 'auto', position: 'relative', width: 'calc(36rem + 42px)' }}>
          <i
            aria-label="cancel"
            className="icon icon-cancel close-search-box-button"
            onClick={::this.hideSearchDropdown}
          />
          <SearchBox
            aria-label="search"
            inputType="text"
            onBlur={::this.handleBlur}
            onChange={::this.handleChange}
            onFocus={::this.handleFocus}
            onSubmit={::this.handleSubmit}
            placeholder="Search Projects..."
          />
          {this.state.showAutocomplete && some(this.state.suggestions) && (
            <Autocomplete options={this.state.suggestions} onClick={::this.handleSubmit} />
          )}
        </div>
      </div>
    )
  }
}
