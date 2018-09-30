import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from 'components/search-box'


export default class HomeBannerSearchBoxComponent extends React.Component {

  render() {
    return (
      <SearchBox
        placeholder={this.props.searchPlaceholder}
        onSubmit={this.props.onSubmit}
        query={this.props.query}
      />
    )
  }
}
