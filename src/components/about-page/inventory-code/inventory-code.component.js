import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InventoryCodeSectionComponent from './inventory-code-section.component'
import InventoryCodeDetailsComponent from './inventory-code-details.component'

class InventoryCodeComponent extends Component {
  state = {
    optionalFields: true,
    details: false
  }

  toggleOptionalFields = () => {
    this.setState(state => ({ optionalFields: !state.optionalFields }))
  }

  toggleDetails = value => {
    this.setState({ details: value ? { ...value } : false })
  }

  renderIntro = () => (
    <>
      <h2>Field Definitions</h2>
      <p>
        The schema fields and definitions are listed below. The optional fields are marked in red
        but serve to provide additional, helpful information. You can view a sample JSON file{' '}
        <a href={this.props.url} target="_blank" rel="noreferrer noopener">
          here
        </a>
        .
      </p>
      <div style={{ marginBottom: '10px' }}>
        <input
          id="json-schema-hide-optional-fields"
          type="checkbox"
          style={{ cursor: 'pointer', textAlign: 'left' }}
          onClick={this.toggleOptionalFields}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <label htmlFor="json-schema-hide-optional-fields" style={{ cursor: 'pointer' }}>
          Hide optional fields
        </label>
      </div>
    </>
  )

  render() {
    const { schema } = this.props
    const { optionalFields, details } = this.state

    return (
      <div
        id="schema-viewer"
        className={classNames({
          'hide-optional-fields': !optionalFields,
          'hide-details': !details
        })}
      >
        {this.renderIntro()}
        <div className="desktop-and-mobile-views">
          {details && (
            <InventoryCodeDetailsComponent toggleDetails={this.toggleDetails} details={details} />
          )}
          <InventoryCodeTableComponent>
            {schema.properties &&
              Object.entries(schema.properties).map((entry, index) => (
                <InventoryCodeSectionComponent
                  key={index} // eslint-disable-line react/no-array-index-key
                  entry={entry}
                  isRequired={schema.required.includes(entry[0])}
                  toggleDetails={this.toggleDetails}
                />
              ))}
          </InventoryCodeTableComponent>
        </div>
      </div>
    )
  }
}

const InventoryCodeTableComponent = ({ children }) => (
  <table>
    <thead>
      <tr>
        <th className="field-name-column">Field Name</th>
        <th className="data-type-column">Data Type</th>
        <th className="description-column">Description</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
)

InventoryCodeComponent.propTypes = {
  schema: PropTypes.PropTypes.shape({
    $schema: PropTypes.string,
    additionalProperties: PropTypes.bool,
    description: PropTypes.string,
    properties: PropTypes.shape({
      version: PropTypes.object,
      measurementType: PropTypes.object,
      agency: PropTypes.object,
      releases: PropTypes.object}),
    required: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  url:PropTypes.string.isRequired
}

export default InventoryCodeComponent
