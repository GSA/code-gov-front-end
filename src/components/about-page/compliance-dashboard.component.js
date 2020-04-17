import React from 'react'
import PropTypes from 'prop-types'

const displayStatus = {
  compliant: 'Fully compliant',
  noncompliant: 'Non-compliant',
  partial: 'Partially compliant'
}

const getStatusAsText = (config, score) => {
  const scores = config.scores

  for (const status in scores) {
    const [min, max] = scores[status]
    if (typeof min === 'number' && typeof max === 'number') {
      if (min <= score && score <= max) {
        return status
      }
    } else if (typeof min === 'number' && typeof max !== 'number') {
      if (min <= score) {
        return status
      }
    } else if (typeof min !== 'number' && typeof max === 'number') {
      if (score <= max) {
        return status
      }
    }
  }
  return ''
}

const getReqLine = (name, req, status, text) => (
  <div key={`${name}-${req}`} className={`req ${status}`}>
    {text}
  </div>
)

const getCard = (config, entry) => {
  const { img, name, requirements } = entry
  const overallStatus = getStatusAsText(config, requirements.overall)

  return (
    <li className={`card ${overallStatus}`} key={`card-${name}`}>
      <div className="dashboard-entity-icon">
        <img src={img} alt={`${name} logo`} />
      </div>
      <div className="dashboard-entity-content">
        <div className="dashboard-entity-heading">
          <h3 className="h3">{name}</h3>
          <h4 className={`h4 ${overallStatus}`}>{displayStatus[overallStatus]}</h4>
          {config.text.map(textPart => {
            const { req, variants } = textPart
            const status = getStatusAsText(config, entry.requirements.sub[req])

            return getReqLine(name, req, status, variants[status])
          })}
        </div>
      </div>
    </li>
  )
}

const ComplianceDashboardComponent = props => (
  <>
    <div className="dashboard-container">
      <ul className="dashboard-list">{props.data.map(entry => getCard(props.config, entry))}</ul>
    </div>
  </>
)

ComplianceDashboardComponent.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

export default ComplianceDashboardComponent
