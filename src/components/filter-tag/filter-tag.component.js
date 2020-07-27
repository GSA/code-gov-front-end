import React from 'react'

export default function FilterTag({ category, onClick, title, value }) {
  console.log('starting to render FilterTag with', [category, title, value])
  return (
    <button
      className="usa-button width-auto margin-top-3 margin-right-2 padding-1 bg-primary display-inline-block radius-md font-body-3xs padding-105 text-no-uppercase"
      onClick={() => onClick(category, value)}
    >
      <i className="icon icon-close padding-right-05" />
      {title}
    </button>
  )
}
