import React from 'react'

export default function OfficialBanner(props) {
  const { isDark = false } = props
  const dataTestId = isDark ? 'component-gov-banner-dark' : 'component-gov-banner'
  return (
    <div className="width-full" data-testid={dataTestId}>
      <gov-banner />
    </div>
  )
}
