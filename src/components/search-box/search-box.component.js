import React, { Component, Fragment } from 'react'

export default class SearchBox extends Component {
  onChange(event) {
    this.props.onChange(event.target.value)
    // do autocomplete here
  }

  onSubmit(event) {
    this.props.onSubmit(event.target.value)
  }

  render() {
    return (
      <form onSubmit={::this.onSubmit}>
        <input placeholder={this.props.placeholder} onChange={::this.onChange} value={this.props.value}/>
        <button className="go">Go</button>
      </form>
    )
  }

}
