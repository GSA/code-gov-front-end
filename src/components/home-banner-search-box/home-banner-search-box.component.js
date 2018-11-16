import React, { Component } from 'react'
import { map, some, truncate } from '@code.gov/cautious'
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

  render() {
    const {searchDescriptionText, searchDescriptionTextMobile, onSubmit, placeholder, query} = this.props
    return (
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <div className="search-description-wrapper">
            {searchDescriptionText && <div className="show-w-gt-800">{searchDescriptionText}</div>}
            {searchDescriptionTextMobile && <div className="show-w-lte-800">{searchDescriptionTextMobile}</div>}
          </div>
          <div className="search-input-and-button-wrapper">
            <SearchBox
              placeholder={placeholder}
              onBlur={::this.handleBlur}
              onChange={::this.handleChange}
              onFocus={::this.handleFocus}
              onSubmit={onSubmit}
              query={query}
            />
            {this.state.showAutocomplete && some(this.state.suggestions) && <Autocomplete options={this.state.suggestions} onClick={onSubmit}/>}
          </div>
        </div>
      </div>
    )
  }
}
