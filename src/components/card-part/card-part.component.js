import React, { Fragment } from 'react'

export default function CardPart({ title, text = 'Not Available' }) {
  return (
    <Fragment>
      <dt>{title + ':'}</dt>
      <dd>{text}</dd>
    </Fragment>
  )
}
