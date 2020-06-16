import React from 'react'

export default function FilterTag({ category, onClick, title, value }) {
  console.log('starting to render FilterTag with', [category, title, value])
  return (
    <span
      className="usa-tag margin-top-3 margin-right-2 padding-1 bg-primary display-inline-block radius-md font-body-3xs padding-x-205 text-no-uppercase"
      onClick={() => onClick(category, value)}
    >
      {title}
    </span>
  )
}
