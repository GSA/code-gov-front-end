import React, { Fragment } from 'react'

export default function CardPart({ title, text = 'Not Available' }) {
  return (
    <Fragment>
      <li>
        <span className="text-bold">{title}: </span>
        {text || 'Not Available'}
      </li>
    </Fragment>
  )
}
