import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'



export default class SearchBox extends Component {
  static propTypes = {
    /*    onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired*/
  }


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
