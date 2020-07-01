import React, { Fragment } from 'react'

export default function CardPart({ title, text }) {
  return (
    <Fragment>
      <li>
        <span className="text-bold">{title}: </span>
        {text || text !== '' ? text : 'Not Available'}
      </li>
    </Fragment>
  )
}
