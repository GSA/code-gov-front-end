// https://reactjs.org/docs/forms.html

import React, { Component, Fragment } from 'react'

export default class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={::this.handleSubmit}>
        <input placeholder={this.props.placeholder} onChange={::this.handleChange} value={this.state.value}/>
        <button className="go">Go</button>
      </form>
    )
  }

}
