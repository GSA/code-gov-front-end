import React from 'react'

export default function OfficialBanner(props) {
  const { isDark = false } = props
  const className = isDark ? 'gov-banner gov-banner__dark'  : 'gov-banner'
  return (
    <div className={className}>
      <gov-banner />
    </div>
  )
}
