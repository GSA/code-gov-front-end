import React, { Component } from 'react'
import LazyHTML from 'components/lazy-html'

class WebBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataUrl: `${PUBLIC_PATH}${props.componentPath}`,
      html: `${props.html}`,
      htmlUrl: ''
    }

    this.state.htmlUrl = `${this.state.dataUrl}${this.state.html}`
  }

  render() {
    const { dataUrl, htmlUrl, domRef, html } = this.state

    return (
      <div ref={domRef}>
        <LazyHTML url={`${dataUrl}${html}`} />
      </div>
    )
  }
}
export default WebBlock
