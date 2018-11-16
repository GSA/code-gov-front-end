import React, { Fragment } from 'react'
import { map, some } from '@code.gov/cautious'
import client from 'api-client'
import Autocomplete from 'components/autocomplete'
import SearchBox from 'components/search-box'

export default class QuickSearchBoxComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      value: ''
    }
  }

  handleChange(value) {
    client.suggest(value, 5).then(terms => {
      const suggestions = map(terms, term => {
        return {
          text: term,
          to: `/search?query=${term}&page=1&size=10`
        }
      })
      this.setState({ suggestions, value })
    })
  }

  handleSelection(value) {
    this.setState({value: value.text, suggestions: []})
  }


  render() {
    return (
      <Fragment>
        <SearchBox
          placeholder={this.props.placeholder || this.props.query}
          onChange={::this.handleChange}
          onSubmit={this.props.onSubmit}
          value={this.state.value}
        />
        {some(this.state.suggestions) && <Autocomplete onClick={::this.handleSelection} options={this.state.suggestions}/>}
      </Fragment>
    )
  }
}
