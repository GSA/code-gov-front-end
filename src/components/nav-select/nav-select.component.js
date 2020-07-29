/* global PUBLIC_PATH */
import React, { Component } from 'react'
import { find, map } from '@code.gov/cautious'
import get from 'lodash.get'

export default class NavSelect extends Component {
  handleChange(event) {
    console.log('starting handleChange with event:', event)
    const value = event.target.value
    console.log('value:', value)
    if (this.props.handleChange) {
      this.props.handleChange(value)
    }
  }

  render() {
    const { pathname, pages } = this.props
    console.log('pages:', pages)
    const current = get(
      find(pages, ({ route }) => pathname.includes(route)),
      'route'
    )
    return (
      <form className="usa-form maxw-none">
        <label className="usa-label usa-sr-only" htmlFor="options">
          Sections Menu
        </label>
        <select
          className="usa-select font-body-3xs radius-md"
          id="options"
          onChange={::this.handleChange}
          value={current}
        >
          {map(pages, ({ display, route }) => (
            <option key={route} value={route}>
              {display}
            </option>
          ))}
        </select>
      </form>
    )
  }
}
