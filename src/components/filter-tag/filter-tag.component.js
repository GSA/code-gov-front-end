import React from 'react'

export default function FilterTag({ category, onClick, title, value }) {
  console.log('starting to render FilterTag with', [category, title, value])
  return (
    <div
      className="filter-tag margin-top-3 margin-right-2"
      onClick={() => onClick(category, value)}
    >
      <div className="filter-tag-title">{title}</div>
    </div>
  )
}
