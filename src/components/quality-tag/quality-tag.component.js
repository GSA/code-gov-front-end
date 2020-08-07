import React, { Component, Fragment } from 'react'

export default class QualityTag extends Component {
  render() {
    const score = this.props.score
    const rounded = Math.round(Number(score) * 10) / 10
    let category = ''
    let color = ''

    if (rounded > 0 && rounded < 4) {
      category = 'low'
      color = 'bg-error-dark'
    } else if (rounded >= 4 && rounded < 6) {
      category = 'medium'
      color = 'bg-warning-darker'
    } else if (rounded >= 6) {
      category = 'high'
      color = 'bg-success-dark'
    } else {
      category = ''
    }

    return (
      <div
        aria-label={`${category} data quality score`}
        className={`height-4 pin-right width-6 radius-lg display-flex flex-column flex-justify-center margin-top-205 margin-right-3 ${color}`}
      >
        <span className="text-center font-body-3xs text-white">{rounded}</span>
      </div>
    )
  }
}
