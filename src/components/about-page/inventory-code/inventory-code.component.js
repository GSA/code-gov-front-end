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
      <h2>Field Definitions</h2>
      <p class="margin-bottom-1">
        The schema fields and definitions are listed below. You can view a sample JSON file{' '}
        <a href={this.props.url} target="_blank" rel="noreferrer noopener">
          here
        </a>
        .
      </p>
      <p class="text-red margin-bottom-3 margin-top-0">
        The schema fields marked in red are optional but recommended as they provide additional,
        helpful information.
      </p>
      <form className="usa-form">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            id="hide-optional-fields"
            type="checkbox"
            value="hide-optional-fields"
            onClick={this.toggleOptionalFields}
          />
          <label className="usa-checkbox__label" for="hide-optional-fields">
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
        className={`margin-top-4 ${classNames({
          'hide-optional-fields': !optionalFields
        })}`}
      >
        {this.renderIntro()}
        <div>
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
  <ul className="usa-card-group margin-top-3">{children}</ul>
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
      releases: PropTypes.object
    }),
    required: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  url: PropTypes.string.isRequired
}

export default InventoryCodeComponent
