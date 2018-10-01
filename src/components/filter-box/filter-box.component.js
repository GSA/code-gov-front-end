import React from 'react'
import ReactDOM from 'react-dom';

export default class FilterBox extends React.Component {

  componentDidMount () {
    // react doesn't bubble up custom events, so we have to do this
    this.refs.filterBox.addEventListener("change", this.props.onChange)
  }

  render() {
    return (
      <filter-box
        title={this.props.title}
        options={JSON.stringify(this.props.options)}
        ref="filterBox"
      ></filter-box>
    )
  }
}
