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

  render() {
    const { entry, isRequired, indent, optionalToggle } = this.props
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
                'text-accent-cool-dark': optionalField,
                'display-none': optionalField && optionalToggle,
                'border-left-0': indent === 0,
                'border-base-lighter': indent === 1 || 2 || 3,
                'border-left-2px': indent === 1 || 2 || 3
              })} usa-accordion__button bg-white border-right-0 border-bottom-0 border-top-0 border-dashed font-body-md tablet-lg:padding-left-3 tablet-lg:padding-right-5 tablet-lg:padding-y-2`}
              aria-expanded={dropDown}
              aria-controls={`${key}-section`}
              onClick={this.toggleDropDown}
            >
              <span className="usa-sr-only">Field Name: </span>
              <p
                className={`${classNames({
                  'text-accent-cool-dark display-inline': optionalField
                })} display-inline`}
              >
                {key}
              </p>
              {optionalField ? (
                <span className="usa-sr-only">Optional field.</span>
              ) : (
                <span className="usa-sr-only">Required field.</span>
              )}
              <span className="usa-sr-only">Data Type: </span>
              <p
                className={`${classNames({
                  'text-accent-cool-dark': optionalField
                })} data-type font-body-3xs text-normal margin-left-1 display-inline`}
              >
                {displayType}
              </p>
              <span className="usa-sr-only">Definition: </span>
              <p
                className={`${classNames({
                  'text-accent-cool-dark': optionalField
                })} description text-normal font-body-3xs margin-bottom-0 margin-top-2px`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <span className="usa-sr-only">
                Toggle the button to view or hide the fields nested in this object.
              </span>
            </button>
            <div
              className={`${classNames({
                'border-left-0': indent === 0,
                'border-left-2px': indent === 1 || 2 || 3
              })} border-dashed border-y-0 border-right-0 border-base-lighter`}
            >
              <div
                id={`${key}-section`}
                className={`${classNames({
                  'top-level': topLevel,
                  'text-accent-cool-dark': optionalField,
                  'display-none': optionalField && optionalToggle
                })} usa-accordion__content margin-y-0 padding-y-0 margin-left-3 tablet-lg:margin-left-4 padding-left-1 padding-right-0`}
              >
                {dropDown &&
                  subEntries &&
                  subEntries.map((subEntry, index) => (
                    <InventoryCodeSectionComponent
                      key={index} // eslint-disable-line react/no-array-index-key
                      entry={subEntry}
                      isRequired={Array.isArray(required) && required.includes(subEntry[0])}
                      indent={indent + 1}
                      optionalToggle={optionalToggle}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${classNames({
                'top-level': topLevel,
                'text-accent-cool-dark': optionalField,
                'display-none': optionalField && optionalToggle,
                'border-left-0': indent === 0,
                'border-base-lighter': indent === 1 || 2 || 3,
                'border-left-2px': indent === 1 || 2 || 3
              })} border-right-0 border-bottom-0 border-top-0 border-dashed font-body-md padding-x-205 text-bold padding-y-105 tablet-lg:padding-left-3 tablet-lg:padding-right-5 tablet-lg:padding-y-2`}
            >
              <span className="usa-sr-only">Field Name: </span>
              <p
                className={`${classNames({
                  'text-accent-cool-dark display-inline': optionalField
                })} display-inline`}
              >
                {key}
              </p>
              {optionalField ? (
                <span className="usa-sr-only">Optional field.</span>
              ) : (
                <span className="usa-sr-only">Required field.</span>
              )}
              <span className="usa-sr-only">Data Type: </span>
              <p
                className={`${classNames({
                  'text-accent-cool-dark': optionalField
                })} data-type font-body-3xs text-normal margin-left-1 display-inline`}
              >
                {displayType}
              </p>
              <span className="usa-sr-only">Definition: </span>
              <p
                className={`${classNames({
                  'text-accent-cool-dark': optionalField
                })} description text-normal font-body-3xs margin-bottom-0 margin-top-2px`}
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
  indent: PropTypes.number
}

export default InventoryCodeSectionComponent
