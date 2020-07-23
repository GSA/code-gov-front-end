import React from 'react'
import FilterBoxWeb from '../filter-box-web/filter-box.component'

export default class FilterBox extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.FilterBoxWeb = React.createRef()
  // }
  // componentDidMount() {
  //   // react doesn't bubble up custom events, so we have to do this
  //   this.FilterBoxWeb.current.addEventListener('change', event => {
  //     if (event.target.tagName.toLowerCase() === 'input') {
  //       const type = event.target.checked ? 'checked' : 'unchecked'
  //       const value = event.target.value
  //       this.props.onChange({ type, value })
  //     }
  //   })
  // }

  // shouldComponentUpdate(nextProps) {
  //   return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  // }

  render() {
    return (
      <FilterBoxWeb
        title={this.props.title}
        options={JSON.stringify(this.props.options)}
        ref="filterBox"
        eventChange={this.props.onChange}
      />
    )
  }
}
