import React, { Component } from 'react'
import { map, some } from '@code.gov/cautious'
import Autocomplete from 'components/autocomplete'
import SearchBox from 'components/search-box'
import client from 'api-client'

export default class HomeBannerSearchBoxComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAutocomplete: false,
      suggestions: []
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleBlur() {
    if (this.mounted) {
      this.setState({ showAutocomplete: false })
    }
  }

  handleFocus() {
    if (this.mounted) {
      this.setState({ showAutocomplete: true })
    }
  }

  handleChange(value) {
    client.suggest(value, 5).then(terms => {
      const suggestions = map(terms, term => ({
        text: term,
        to: `/search?query=${term}&page=1&size=10`
      }))
      if (this.mounted) {
        this.setState({
          showAutocomplete: true,
          suggestions
        })
      }
    })
  }

  handleClick({ text }) {
    this.props.onSubmit(text)
  }

  render() {
    const {
      searchDescriptionHeading,
      searchDescriptionText,
      onSubmit,
      placeholder,
      query
    } = this.props
    return (
      <>
        <h2 className="tablet-lg:text-uppercase text-bold text-base-darker margin-bottom-1 tablet-lg:margin-bottom-0 font-body-xs">
          {searchDescriptionHeading}
        </h2>
        {searchDescriptionText && (
          <div className="margin-bottom-105 margin-top-2px text-bold text-base-darker tablet-lg:display-block display-none">
            {searchDescriptionText}
          </div>
        )}
        <div className="margin-x-auto borderless-search mobile-lg:grid-col-10 tablet:grid-col-8 tablet-lg:grid-col-6">
          <SearchBox
            placeholder={placeholder}
            onBlur={::this.handleBlur}
            onChange={::this.handleChange}
            onFocus={::this.handleFocus}
            onSubmit={onSubmit}
            query={query}
          />
          {this.state.showAutocomplete && some(this.state.suggestions) && (
            <Autocomplete options={this.state.suggestions} onClick={::this.handleClick} />
          )}
        </div>
      </>
    )
  }
}
