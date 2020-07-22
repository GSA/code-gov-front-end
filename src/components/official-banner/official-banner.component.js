import React from 'react'
import GovBanner from '../gov-banner'

export default function OfficialBanner(props) {
  const { isDark = false } = props
  const dataTestId = isDark ? 'component-gov-banner-dark' : 'component-gov-banner'
  return (
    <div className="width-full" data-testid={dataTestId}>
      <GovBanner />
    </div>
  )
}
