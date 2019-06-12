import React, { Fragment } from 'react'
import { map, some } from '@code.gov/cautious'
import client from 'api-client'
import Autocomplete from 'components/autocomplete'
import SearchBox from 'components/search-box'

export default class QuickSearchBoxComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAutocomplete: false,
      suggestions: [],
      value: props.value || ''
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  // need to update value when props value changes
  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      if (this.mounted) {
        this.setState({ value })
      }
    }
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

  handleSelection(value) {
    if (this.mounted) {
      this.setState({
        showAutocomplete: false,
        suggestions: [],
        value: value.text
      })
    }
  }

  render() {
    return (
      <Fragment>
        <SearchBox
          placeholder={this.props.placeholder}
          onBlur={::this.handleBlur}
          onFocus={::this.handleFocus}
          onChange={::this.handleChange}
          onSubmit={this.props.onSubmit}
          value={this.state.value}
        />
        {this.state.showAutocomplete && some(this.state.suggestions) && (
          <Autocomplete onClick={::this.handleSelection} options={this.state.suggestions} />
        )}
      </Fragment>
    )
  }
}
