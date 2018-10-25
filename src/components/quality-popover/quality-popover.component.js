import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class QualityPopover extends Component {

  render() {
    return (
      <div style="position: absolute; right: 0; top: -25px;">
        <span class="data-quality-title">Data Quality Score</span>
        <div class="icon icon-help-circled popper">
          <div class="popover desktop left">The Data Quality Score is determined by using the information provided by Agencies in their <Link to="/policy-guide/docs/compliance/inventory-code">code.json</Link> and by factors such as completeness and adherence to the <Link to="/policy-guide/docs/compliance/inventory-code">metadata schema</Link>.</div>
          <div class="popover mobile left">
            <div class="popover-title">Data Quality Score</div>
            The Data Quality Score is determined by using the information provided by Agencies in their <Link to="/policy-guide/docs/compliance/inventory-code">code.json</Link> and by factors such as completeness and adherence to the <Link to="/policy-guide/docs/compliance/inventory-code">metadata schema</Link>.</div>
        </div>
      </div>
    )
  }

}
