import React, { Fragment } from 'react'
import { loadScript } from 'utils/other'

class JSONValidator extends React.Component {

  constructor(props) {
    super(props)
    this.loading = false
    this.state = {}
  }

  componentDidMount() {
    if (!this.loading) {
      this.loading = true
      const webcomponent = customElements.get('json-schema-validator')
      if (!webcomponent) {
        loadScript(PUBLIC_PATH + 'webcomponents/json-schema-validator.js', true)
      }
    }
  }

  render() {
    return (
      <Fragment>
        <h1>Code.json Validator</h1>
        <p>Please enter your code.json file below in order to validate it correctly meets the specification.</p>
        <json-schema-validator
          ajv={PUBLIC_PATH + 'external/ajv.min.js'}
          jsoneditor={PUBLIC_PATH + 'external/jsoneditor'}
          metaschema={PUBLIC_PATH + 'assets/data/json-schema-draft-04.json'}
          schema={PUBLIC_PATH + 'assets/data/schema.json'}
        />
      </Fragment>
    )
  }
}

export default JSONValidator