import React from 'react'
import SearchBox from 'components/search-box'

export default class SearchPageSearchBoxComponent extends React.Component {

  render() {
    return (
      <SearchBox
        placeholder={this.props.query}
        onSubmit={this.props.onSubmit}
        query={this.props.query}
      />
    )
  }
}
