import React from 'react'

export default function ({ title, options, onChange }) {
  return <filter-box title={title} options={JSON.stringify(options)} onChange={onChange}></filter-box>
}
