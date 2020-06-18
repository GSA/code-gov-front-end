import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { prettify } from 'utils/other'

class InventoryCodeSectionComponent extends Component {
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
    const [key, value] = entry
    const { items, properties, type } = value
    const description = prettify(this.getValue(value, 'description'))
    const required = this.getValue(value, 'required')
    const topLevel = indent === 0
    const optionalField = isRequired === false
    const subEntries = this.getSubSection(type, items, properties)
    const displayType = Array.isArray(type) ? type.join(' or ') : type

    return (
      <>
        <li
          className={`grid-col-12 usa-card margin-bottom-2 ${classNames({
            'top-level': topLevel,
            'display-none': optionalField && optionalToggle
          })}`}
        >
          <div className="usa-card__container">
            <header className="usa-card__header padding-bottom-0">
              <h2
                className={`usa-card__heading font-heading-lg ${classNames({
                  'text-accent-warm-dark': optionalField
                })}`}
              >
                {key}
              </h2>
            </header>
            <div className="usa-card__body">
              <p
                className={`margin-bottom-0 font-body-2xs ${classNames({
                  'text-accent-warm-dark': optionalField
                })}`}
              >
                <strong>Class: </strong>
                {displayType}
              </p>
              <p
                className={`margin-top-0 font-body-2xs ${classNames({
                  'text-accent-warm-dark': optionalField
                })}`}
              >
                <strong>Description: </strong>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </p>
            </div>
          </div>
        </li>
        {subEntries &&
          subEntries.map((subEntry, index) => (
            <InventoryCodeSectionComponent
              key={index} // eslint-disable-line react/no-array-index-key
              entry={subEntry}
              isRequired={Array.isArray(required) && required.includes(subEntry[0])}
              indent={indent + 1}
              optionalToggle={optionalToggle}
            />
          ))}
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
