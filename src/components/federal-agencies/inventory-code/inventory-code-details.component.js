import React from 'react'
import classNames from 'classnames'

const InventoryCodeDetailsComponent = ({
  toggleDetails,
  mobileView,
  details: { key, displayType, description, topLevel }
}) => (
  <>
    <div id="mobile-details-overlay" />
    <div id="mobile-details">
      <div id="mobile-details-title">{key}</div>
      <table className="usa-table font-body-3xs">
        <thead>
          <tr>
            <th id="mobile-data-type-column">Data Type</th>
            <th className="mobile-description-column">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classNames({ first: topLevel })}>
            <td className="mobile-data-type">{displayType}</td>
            {/* eslint-disable-next-line react/no-danger */}
            <td className="mobile-description" dangerouslySetInnerHTML={{ __html: description }} />
          </tr>
          <tr>
            <td className="back">
              <button onClick={() => toggleDetails(false)}>
                <div id="back-arrow" className="arrow-left" />
                <div className="field-name-text">back</div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
)

export default InventoryCodeDetailsComponent
