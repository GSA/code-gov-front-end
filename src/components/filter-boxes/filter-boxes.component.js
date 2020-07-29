import React, { Fragment } from 'react'
import FilterBox from 'components/filter-box'
import { some } from '@code.gov/cautious'

export default class FilterBoxes extends React.Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  render() {
    console.log('starting filterboxes with', this.props)
    if (this.props.boxes && this.props.config) {
      // filter by whether have filter options from server
      const filtered = this.props.config.filter(([_text, category]) =>
        some(this.props.boxes[category])
      )

      return (
        <Fragment>
          {filtered.map(([text, category], _index) => (
            <FilterBox
              key={text}
              title={text}
              options={JSON.stringify(this.props.boxes[category])}
              onChange={change => this.props.onFilterBoxChange(category, change)}
            />
          ))}
        </Fragment>
      )
    }
    return null
  }
}
