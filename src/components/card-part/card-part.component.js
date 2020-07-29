import React, { Fragment } from 'react'

export default function CardPart({ title, text, className }) {
  return (
    <Fragment>
      <li className={className}>
        <span className="text-bold">{title}: </span>
        {text && text !== '' && text !== 'null' ? text : 'Not Available'}
      </li>
    </Fragment>
  )
}
