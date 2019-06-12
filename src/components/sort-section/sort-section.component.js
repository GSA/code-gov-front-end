// https://reactjs.org/docs/forms.html

import React, { Component, Fragment } from 'react'

import { find, map } from '@code.gov/cautious'

export default class SortSection extends Component {
  onSortChange(event) {
    const value = event.target.value
    if (this.props.onSortChange) {
      this.props.onSortChange(value)
    }
  }

  render() {
    console.log('rendering sort-section', this.props.options)
    const selection = find(this.props.options, option => option.selected).value
    return (
      <div className="sort-section">
        <h2>
          <span>Sort by</span>
          <select aria-label="sort" onChange={::this.onSortChange} value={selection}>
            {map(this.props.options, option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </h2>
      </div>
    )
  }
}
