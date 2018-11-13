import React, { Component } from 'react'
import CustomLink from 'components/custom-link'

export default class QualityPopover extends Component {

  render() {
    return (
      <div style={{position: 'absolute', right: '0', top: '-25px'}}>
        <span className="data-quality-title">Data Quality Score</span>
        <div className="icon icon-help-circled popper">
          <div className="popover desktop left">The Data Quality Score is determined by using the information provided by Agencies in their <CustomLink to="/policy-guide/docs/compliance/inventory-code">code.json</CustomLink> and by factors such as completeness and adherence to the <CustomLink to="/policy-guide/docs/compliance/inventory-code">metadata schema</CustomLink>.</div>
          <div className="popover mobile left">
            <div className="popover-title">Data Quality Score</div>
            The Data Quality Score is determined by using the information provided by Agencies in their <CustomLink to="/policy-guide/docs/compliance/inventory-code">code.json</CustomLink> and by factors such as completeness and adherence to the <CustomLink to="/policy-guide/docs/compliance/inventory-code">metadata schema</CustomLink>.</div>
        </div>
      </div>
    )
  }

}
