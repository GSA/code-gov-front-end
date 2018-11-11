import React from 'react'
import SearchBox from 'components/search-box'

export default class QuickSearchBoxComponent extends React.Component {

  render() {
    return (
      <SearchBox
        placeholder={this.props.placeholder || this.props.query}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}
