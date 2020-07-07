import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InventoryCodeSectionComponent from './inventory-code-section.component'
import InventoryCodeDetailsComponent from './inventory-code-details.component'

class InventoryCodeComponent extends Component {
  state = {
    optionalFields: true,
    details: false,
    mobileView: true
  }

  toggleOptionalFields = () => {
    this.setState(state => ({ optionalFields: !state.optionalFields }))
  }

  toggleDetails = value => {
    this.setState({ details: value ? { ...value } : false })
    console.log('toggle details')
    const mobileView = !this.state.mobileView
    this.setState({ mobileView })
    if (this.state.mobileView) {
      document.getElementById('code-table').setAttribute('hidden', 'true')
      document.getElementById('optional-toggle-form').setAttribute('hidden', 'true')
      document.getElementById('how-to-inventory-a').setAttribute('hidden', 'true')
      document.getElementById('how-to-inventory-b').setAttribute('hidden', 'true')
      document.getElementsByClassName('usa-section')[0].setAttribute('hidden', 'true')
      document.getElementsByClassName('menu-banner-header')[0].setAttribute('hidden', 'true')
      document.getElementsByClassName('show-w-lte-600')[0].setAttribute('hidden', 'true')
      document.getElementsByClassName('usa-skipnav')[0].setAttribute('hidden', 'true')
      document.getElementById('breadcrumbs').setAttribute('hidden', 'true')
      document.querySelector('footer').setAttribute('hidden', 'true')
    } else {
      document.getElementById('code-table').removeAttribute('hidden')
      document.getElementById('optional-toggle-form').removeAttribute('hidden')
      document.getElementById('how-to-inventory-a').removeAttribute('hidden')
      document.getElementById('how-to-inventory-b').removeAttribute('hidden')
      document.getElementsByClassName('usa-section')[0].removeAttribute('hidden')
      document.getElementsByClassName('menu-banner-header')[0].removeAttribute('hidden')
      document.getElementsByClassName('show-w-lte-600')[0].removeAttribute('hidden')
      document.getElementsByClassName('usa-skipnav')[0].removeAttribute('hidden')
      document.getElementById('breadcrumbs').removeAttribute('hidden')
      document.querySelector('footer').removeAttribute('hidden')
    }
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
    const { optionalFields, details, mobileView } = this.state

    return (
      <div
        id="schema-viewer"
        className={`margin-top-4 ${classNames({
          'hide-optional-fields': !optionalFields,
          'hide-details': !details
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
                  toggleDetails={this.toggleDetails}
                  optionalToggle={optionalFields}
                />
              ))}
          </InventoryCodeTableComponent>
          {details && (
            <InventoryCodeDetailsComponent
              toggleDetails={this.toggleDetails}
              details={details}
              mobileView={mobileView}
            />
          )}
        </div>
      </div>
    )
  }
}

const InventoryCodeTableComponent = ({ children }) => (
  <table className="usa-table" id="code-table">
    <thead className="font-body-sm">
      <tr>
        <th className="field-name-column" scope="col">
          Field Name
        </th>
        <th className="data-type-column" scope="col">
          Data Type
        </th>
        <th className="description-column" scope="col">
          Description
        </th>
      </tr>
    </thead>
    <tbody className="font-body-xs">{children}</tbody>
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
      releases: PropTypes.object
    }),
    required: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default InventoryCodeComponent
