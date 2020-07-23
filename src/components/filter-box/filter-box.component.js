import React from 'react'
import FilterBoxWeb from '../filter-box-web/filter-box.component'

export default class FilterBox extends React.Component {
  render() {
    return (
      <FilterBoxWeb
        title={this.props.title}
        options={JSON.stringify(this.props.options)}
        ref="filterBox"
        eventChange={this.props.onChange}
        key={`${this.props.title  } Filter`}
      />
    )
  }
}
