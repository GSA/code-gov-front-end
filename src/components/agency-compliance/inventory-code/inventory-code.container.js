import React, { Component } from 'react'
import { getJSON } from 'utils/other'
import LazyHTML from 'components/lazy-html'
import InventoryCodeComponent from './inventory-code.component'

const dataurl = `${PUBLIC_PATH}src/components/federal-agencies/html/`
const schemaUrl = `${PUBLIC_PATH}assets/data/schema.json`

class InventoryCodeContainer extends Component {
  constructor(props) {
    super(props)
    this.loading = false
    this.state = {
      schema: {}
    }
  }

  componentDidMount() {
    if (!this.loading) {
      this.loading = true
      getJSON(schemaUrl).then(schema => this.setState({ schema }))
    }
  }

  render() {
    const { schema } = this.state

    return (
      <>
        <div id="how-to-inventory-a">
          <LazyHTML url={`${dataurl}compliance/how-to-inventory-a.html`} />
        </div>
        <InventoryCodeComponent url={schemaUrl} schema={schema} />
        <LazyHTML url={`${dataurl}compliance/data-assets-ai.html`} />
        <div id="how-to-inventory-b">
          <LazyHTML url={`${dataurl}compliance/how-to-inventory-b.html`} />
        </div>
      </>
    )
  }
}

export default InventoryCodeContainer
