import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { prettify } from 'utils/other'

class InventoryCodeSectionComponent extends Component {
  state = {
    dropDown: true
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

  renderDropDown = () => (
    <button
      className={classNames('dropdown', { 'hide-dropdown': this.state.dropDown })}
      onClick={this.toggleDropDown}
      aria-label="toggle dropdown"
    >
      <div className="arrow-up-or-down" />
    </button>
  )

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
        <tr className={classNames({ 'top-level': topLevel, optional: isRequired === false })}>
          <td style={{ paddingLeft: `${10 + 20 * indent}px` }}>
            {hasDropDown ? this.renderDropDown() : <div className="dropdown" />}
            <div className="field-name-text">{key}</div>
            {this.renderDetailsButton({ key, displayType, description, topLevel })}
          </td>
          <td className="data-type">
            <div>{displayType}</div>
          </td>
          <td className="description">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </td>
        </tr>
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
