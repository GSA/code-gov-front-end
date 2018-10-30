import React, { Component, Fragment } from 'react'

export default function CardPart({ title, text }) {
  return (
    <Fragment>
      <dt>{title + ':'}</dt>
      <dd>{text || 'N/A'}</dd>
    </Fragment>
  )
}
