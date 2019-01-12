import React, { Component, Fragment } from 'react'
import FilterBox from 'components/filter-box'
import { some } from '@code.gov/cautious'

export default class FilterBoxes extends Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  render() {
    console.log('starting filterboxes with', this.props)
    if (this.props.boxes && this.props.config) {
      // filter by whether have filter options from server
      console.log('filter-boxes.component -> render')
      console.log(':: PLEASE remove (eslint-disable-next-line)')
      // eslint-disable-next-line no-unused-vars
      const filtered = this.props.config.filter(([_text, category]) =>
        some(this.props.boxes[category])
      )

      return (
        <Fragment>
          {filtered.map(([text, category]) => (
            <FilterBox
              key={text}
              title={text}
              options={this.props.boxes[category]}
              onChange={change => this.props.onFilterBoxChange(category, change)}
            />
          ))}
        </Fragment>
      )
    }
    return null
  }
}
