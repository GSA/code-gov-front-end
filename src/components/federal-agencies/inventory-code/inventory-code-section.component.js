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
              })}  api-drop-list bg-white padding-left-1 mobile:padding-left-205 border-right-0 border-bottom-0 border-top-0 border-dashed font-body-md tablet-lg:padding-left-3 tablet-lg:padding-right-5 tablet-lg:padding-y-2`}
              aria-expanded={dropDown}
              aria-controls={`${key}-section`}
              onClick={this.toggleDropDown}
            >
              <dl className="margin-0 text-base-dark line-height-sans-4">
                <dt className="margin-left-0 usa-sr-only">Field Name: </dt>
                <dd
                  className={`${classNames({
                    'text-accent-cool-dark': optionalField
                  })} text-bold display-inline margin-left-0`}
                >
                  {key}
                </dd>
                {optionalField ? (
                  <dd className="usa-sr-only margin-left-0">Optional field.</dd>
                ) : (
                  <dd className="usa-sr-only margin-left-0">Required field.</dd>
                )}
                <dt className="usa-sr-only margin-left-0">Data Type: </dt>
                <dd
                  className={`${classNames({
                    'text-accent-cool-dark': optionalField
                  })} data-type font-body-3xs text-normal margin-left-05 display-inline`}
                >
                  {displayType}
                </dd>
                {optionalField ? (
                  <dd
                    className="text-accent-cool-dark font-body-3xs text-italic text-normal margin-left-05 display-inline"
                    aria-hidden="true"
                  >
                    (optional)
                  </dd>
                ) : (
                  ''
                )}
                <dt className="usa-sr-only margin-left-0">Definition: </dt>
                <dd
                  className={`${classNames({
                    'text-accent-cool-dark': optionalField
                  })} description text-normal font-body-3xs margin-bottom-0 margin-left-0 margin-top-05 line-height-sans-4`}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </dl>
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
                })} usa-accordion__content margin-y-0 padding-y-0 margin-left-1 mobile:margin-left-3 tablet-lg:margin-left-4 padding-left-1 padding-right-0`}
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
              })} border-right-0 border-bottom-0 border-top-0 border-dashed font-body-md padding-x-1 mobile:padding-x-205 text-bold padding-y-105 tablet-lg:padding-left-3 tablet-lg:padding-right-5 tablet-lg:padding-y-2`}
            >
              <dl className="margin-0 text-base-dark">
                <dt className="margin-left-0 usa-sr-only">Field Name: </dt>
                <dd
                  className={`${classNames({
                    'text-accent-cool-dark': optionalField
                  })} display-inline margin-left-0`}
                >
                  {key}
                </dd>
                {optionalField ? (
                  <dd className="usa-sr-only margin-left-0">Optional field.</dd>
                ) : (
                  <dd className="usa-sr-only margin-left-0">Required field.</dd>
                )}
                <dt className="usa-sr-only margin-left-0">Data Type: </dt>
                <dd
                  className={`${classNames({
                    'text-accent-cool-dark': optionalField
                  })} data-type font-body-3xs text-normal margin-left-05 display-inline`}
                >
                  {displayType}
                </dd>
                {optionalField ? (
                  <dd
                    className="text-accent-cool-dark font-body-3xs text-italic text-normal margin-left-05 display-inline"
                    aria-hidden="true"
                  >
                    (optional)
                  </dd>
                ) : (
                  ''
                )}
                <dt className="usa-sr-only margin-left-0">Definition: </dt>
                <dd
                  className={`${classNames({
                    'text-accent-cool-dark': optionalField
                  })} description text-normal font-body-3xs margin-bottom-0 margin-top-05 margin-left-0`}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </dl>
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
