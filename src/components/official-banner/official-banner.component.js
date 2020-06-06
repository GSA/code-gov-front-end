import React from 'react'

export default function OfficialBanner(props) {
  const { isDark = false } = props
  const className = isDark ? 'position-fixed z-500 width-full' : 'position-fixed z-500 width-full'
  const dataTestId = isDark ? 'component-gov-banner-dark' : 'component-gov-banner'
  return (
    <div className={className} data-testid={dataTestId}>
      <gov-banner />
    </div>
  )
}
