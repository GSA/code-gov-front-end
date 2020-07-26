import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InventoryCodeSectionComponent from './inventory-code-section.component'

class InventoryCodeComponent extends Component {
  state = {
    optionalFields: false
  }

  toggleOptionalFields = () => {
    this.setState(state => ({ optionalFields: !state.optionalFields }))
  }

  renderIntro = () => (
    <>
      <form className="usa-form" id="optional-toggle-form">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            id="hide-optional-fields"
            type="checkbox"
            value="hide-optional-fields"
            onClick={this.toggleOptionalFields}
          />
          <label className="usa-checkbox__label" htmlFor="hide-optional-fields">
            Hide Optional Fields
          </label>
        </div>
      </form>
    </>
  )

  render() {
    const { schema } = this.props
    const { optionalFields } = this.state

    return (
      <div
        id="schema-viewer"
        className={`margin-top-4 ${classNames({
          'hide-optional-fields': optionalFields
        })}`}
      >
        {this.renderIntro()}
        <div className="desktop-and-mobile-views">
          <InventoryCodeTableComponent>
            {schema.properties &&
              Object.entries(schema.properties).map((entry, index) => (
                <InventoryCodeSectionComponent
                  key={index} // eslint-disable-line react/no-array-index-key
                  entry={entry}
                  isRequired={schema.required.includes(entry[0])}
                  optionalToggle={optionalFields}
                />
              ))}
          </InventoryCodeTableComponent>
        </div>
      </div>
    )
  }
}

const InventoryCodeTableComponent = ({ children }) => (
  <div
    className="usa-accordion margin-top-2 margin-bottom-4 border-2px border-base text-base-dark"
    id="code-table"
  >
    {children}
  </div>
)

InventoryCodeComponent.propTypes = {
  schema: PropTypes.PropTypes.shape({
    $schema: PropTypes.string,
    additionalProperties: PropTypes.bool,
    description: PropTypes.string,
    properties: PropTypes.shape({
      version: PropTypes.objectOf(PropTypes.object).isRequired,
      measurementType: PropTypes.objectOf(PropTypes.object).isRequired,
      agency: PropTypes.objectOf(PropTypes.object).isRequired,
      releases: PropTypes.objectOf(PropTypes.object).isRequired
    }),
    required: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default InventoryCodeComponent
