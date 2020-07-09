import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { prettify } from 'utils/other'

class InventoryCodeSectionComponent extends Component {
  state = {
    dropDown: false
  }

  toggleDropDown = () => {
    this.setState(state => ({ dropDown: !state.dropDown }))
  }

  hasDropDown = item => {
    const { type } = item
    return (type.includes('array') && item.items.type !== 'string') || type.includes('object')
  }

  getValue = (obj, key) => {
    if (obj[key]) {
      return obj[key]
    }
    if (obj.array && obj.array[key]) {
      return obj.array[key]
    }
    if (obj.items && obj.items[key]) {
      return obj.items[key]
    }
    return ''
  }

  getSubSection = (type, items, properties) => {
    let entries
    if (type.includes('array') && (items.type.includes('array') || items.type.includes('object'))) {
      entries = Object.entries(items.properties)
    } else if (type.includes('object')) {
      entries = Object.entries(properties)
    }
    return entries
  }

  renderDetailsButton = value => (
    <button className="details" onClick={() => this.props.toggleDetails(value)}>
      <div className="details-text">details</div>
      <div className="details-arrow arrow-right" />
    </button>
  )

  render() {
    const { entry, isRequired, indent, toggleDetails, optionalToggle } = this.props
    const { dropDown } = this.state
    const [key, value] = entry
    const { items, properties, type } = value
    const description = prettify(this.getValue(value, 'description'))
    const required = this.getValue(value, 'required')
    const hasDropDown = this.hasDropDown(value)
    const topLevel = indent === 0
    const optionalField = isRequired === false
    const subEntries = this.getSubSection(type, items, properties)
    const displayType = Array.isArray(type) ? type.join(' or ') : type

    return (
      <>
        {hasDropDown ? (
          <>
            <button
              className={`${classNames({
                'top-level': topLevel,
                'text-red': optionalField,
                'display-none': optionalField && optionalToggle,
                'border-black': indent === 0,
                'border-primary-dark': indent === 1,
                'border-primary': indent === 2,
                'border-primary-light': indent === 3
              })} usa-accordion__button border-left-1 font-body-md border-bottom-2px`}
              aria-expanded={dropDown}
              aria-controls={`${key}-section`}
              onClick={this.toggleDropDown}
            >
              <span className="usa-sr-only">Field Name: </span>
              {key}
              <span className="usa-sr-only">Data Type: </span>
              <span className="data-type font-body-3xs text-normal margin-left-1">
                {displayType}
              </span>
              <span className="usa-sr-only">Definition: </span>
              <p
                className={`${classNames({
                  'text-red': optionalField
                })} description text-normal font-body-3xs`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <span className="usa-sr-only">
                Toggle the button to view or hide the fields nested in this object.
              </span>
            </button>
            <div
              id={`${key}-section`}
              className="usa-accordion__content margin-y-0 padding-y-0 padding-left-1 padding-right-0"
            >
              {dropDown &&
                subEntries &&
                subEntries.map((subEntry, index) => (
                  <InventoryCodeSectionComponent
                    key={index} // eslint-disable-line react/no-array-index-key
                    entry={subEntry}
                    isRequired={Array.isArray(required) && required.includes(subEntry[0])}
                    indent={indent + 1}
                    toggleDetails={toggleDetails}
                    optionalToggle={optionalToggle}
                  />
                ))}
            </div>
          </>
        ) : (
          <>
            <div
              className={`${classNames({
                'top-level': topLevel,
                'text-red': optionalField,
                'display-none': optionalField && optionalToggle,
                'border-black': indent === 0,
                'border-primary-dark': indent === 1,
                'border-primary': indent === 2,
                'border-primary-light': indent === 3
              })} border-left-1 font-body-md bg-base-lightest padding-x-3 text-bold padding-y-2 border-bottom-2px`}
            >
              <span className="usa-sr-only">Field Name: </span>
              {key}
              <span className="usa-sr-only">Data Type: </span>
              <span className="data-type font-body-3xs text-normal margin-left-1">
                {displayType}
              </span>
              <span className="usa-sr-only">Definition: </span>
              <p
                className={`${classNames({
                  'text-red': optionalField
                })} description text-normal font-body-3xs margin-bottom-0`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </>
        )}
      </>
    )
  }
}

InventoryCodeSectionComponent.defaultProps = {
  indent: 0
}

InventoryCodeSectionComponent.propTypes = {
  entry: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired])
  ).isRequired,
  isRequired: PropTypes.bool.isRequired,
  indent: PropTypes.number,
  toggleDetails: PropTypes.func.isRequired
}

export default InventoryCodeSectionComponent
