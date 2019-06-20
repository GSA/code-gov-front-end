import React from 'react'

export default function OfficialBanner(props) {
  const { isDark = false } = props
  const className = isDark ? 'gov-banner gov-banner__dark' : 'gov-banner'
  const dataTestId = isDark ? 'component-gov-banner-dark' : 'component-gov-banner'
  return (
    <div className={className} data-testid={dataTestId}>
      <gov-banner />
    </div>
  )
}
