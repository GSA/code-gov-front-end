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
      searchDescriptionTextMobile,
      onSubmit,
      placeholder,
      query
    } = this.props
    return (
      <>
        <div className="text-uppercase text-bold text-base-darker show-w-gt-800 padding-bottom-2px">
          {searchDescriptionHeading}
        </div>
        {searchDescriptionText && (
          <div className="margin-bottom-105 text-bold text-base-darker show-w-gt-800">
            {searchDescriptionText}
          </div>
        )}
        {searchDescriptionTextMobile && (
          <div className="show-w-lte-800 text-bold text-base-darker padding-bottom-105">
            {searchDescriptionTextMobile}
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
