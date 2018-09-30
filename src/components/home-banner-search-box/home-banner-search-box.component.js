import React, { Fragment } from 'react'
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
