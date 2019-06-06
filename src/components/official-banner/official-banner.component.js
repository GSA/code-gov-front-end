import React from 'react'

export default function OfficialBanner(props) {
  const { className = '', isDark = false } = props
  const banner = isDark ? <gov-banner dark /> : <gov-banner />
  return (
    <div className={className}>
      {banner}
    </div>
  )
}
