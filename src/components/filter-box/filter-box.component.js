import React from 'react'
import ReactDOM from 'react-dom';

export default class FilterBox extends React.Component {

  componentDidMount () {
    // react doesn't bubble up custom events, so we have to do this
    this.refs.filterBox.addEventListener("change", event => {
      if (event.target.tagName.toLowerCase() === 'input') {
        const target = event.target
        const type = target.checked ? 'checked' : 'unchecked'
        const value = target.value
        this.props.onChange( { type, value })
      }
    })
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
