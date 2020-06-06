import React, { Fragment } from 'react'

export default function CardPart({ title, text = 'Not Available' }) {
  return (
    <Fragment>
      <dt className="display-inline text-bold">{`${title}:`}</dt>
      <dd className="display-inline-block margin-left-1 margin-right-3">
        {text || 'Not Available'}
      </dd>
    </Fragment>
  )
}
