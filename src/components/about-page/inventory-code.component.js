import React, { Component, Fragment } from 'react'
import { loadScript } from 'utils/other'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/about-page/html/`

class InventoryCode extends Component {
  constructor(props) {
    super(props)
    this.loading = false
    this.state = {}
  }

  componentDidMount() {
    if (!this.loading) {
      this.loading = true
      const webcomponent = customElements.get('json-schema')
      if (!webcomponent) {
        loadScript(`${PUBLIC_PATH}webcomponents/json-schema.js`, true)
      }
    }
  }

  render() {
    return (
      <Fragment>
        <LazyHTML url={`${dataurl}compliance/how-to-inventory-a.html`} />
        <json-schema url={`${PUBLIC_PATH}assets/data/schema.json`} />
        <LazyHTML url={`${dataurl}compliance/how-to-inventory-b.html`} />
      </Fragment>
    )
  }
}

export default InventoryCode
