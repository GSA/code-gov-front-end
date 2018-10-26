// https://reactjs.org/docs/forms.html

import React, { Component, Fragment } from 'react'

import { map } from '@code.gov/cautious'

export default class SortSection extends Component {

  onSortChange(event) {
    const value = event.target.value
    if (this.props.onSortChange) {
      this.props.onSortChange(value)
    }
  }

  render() {
    console.log("rendering sort-section", this.props.options)
    return (
      <div className="sort-section">
        <h2>
          <span>Sort by</span>
          <select onChange={::this.onSortChange}>
          {map(this.props.options, option => {
            return <option key={option} value={option}>{option}</option>
          })}
          </select>
        </h2>
      </div>
    )
  }

}
