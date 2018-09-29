import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from 'components/search-box'


export default class GlobalSearchBoxComponent extends React.Component {

  render() {
    return (
      <SearchBox
        placeholder={this.props.searchPlaceholder}
        onChange={this.props.updateQuery}
        onSubmit={this.props.onSubmit}
        query={this.props.query}
      />
    )
  }
}
