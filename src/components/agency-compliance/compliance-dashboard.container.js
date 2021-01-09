import React, { Component, Fragment } from 'react'
import { loadScript } from 'utils/other'
import LazyHTML from 'components/lazy-html'
import client from 'api-client'
import ComplianceDashboardComponent from './compliance-dashboard.component'
// import inventory from 'components/agencies/agency_list'
import inventory from '../../../config/site/agency_list'

const dataurl = `${PUBLIC_PATH}src/components/agency-compliance/html/`

export const config = {
  text: [
    {
      req: 'policy',
      variants: {
        compliant: 'Agency policy is consistent with the Federal Source Code Policy.',
        partial:
          'Agency policy is being updated for consistency with the Federal Source Code Policy.',
        noncompliant:
          'Agency policy has not been reviewed for consistency with the Federal Source Code Policy.'
      }
    },
    {
      req: 'acquisition',
      variants: {
        compliant: 'Agency has updated acquisition language.',
        partial: 'Agency has acquisitioned-ish.',
        noncompliant: 'Agency has not updated acquisition language.'
      }
    },
    {
      req: 'inventory',
      variants: {
        compliant: 'Agency has complete inventory and is posted to Code.gov',
        partial: 'Agency has completed inventory, but has not posted to Code.gov.',
        noncompliant: 'Agency has not completed inventory.'
      }
    }
  ]
}

class ComplianceDashboardContainer extends Component {
  constructor(props) {
    super(props)
    this.loading = false
    this.state = {
      compliance: []
    }
  }

  render() {
    const { compliance } = this.state

    return (
      <>
        <LazyHTML url={`${dataurl}compliance/agency-compliance.html`} />
        <ComplianceDashboardComponent inventory={inventory} config={config} data={compliance} />
      </>
    )
  }
}

export default ComplianceDashboardContainer
