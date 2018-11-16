// https://reactjs.org/docs/forms.html

import React, { Component, Fragment } from 'react'

export default class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }


  // need to update value when props value changes
  componentDidUpdate(prevProps) {
    const value = this.props.value
    if (value !== prevProps.value) {
      this.setState({ value })
    }
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <form className="search-form" onSubmit={::this.handleSubmit}>
        <div className="search-input-wrapper">
          <div className="search-input-and-button-wrapper">
            <input placeholder={this.props.placeholder} onChange={::this.handleChange} value={this.state.value}/>
            <button className="go">Go</button>
          </div>
        </div>
      </form>
    )
  }

}
