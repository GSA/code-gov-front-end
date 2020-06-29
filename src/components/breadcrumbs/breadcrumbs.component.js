import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default function Breadcrumbs({ crumbs }) {
  return (
    <div className="grid-container">
      <ul className="grid-row margin-top-4">
        {crumbs
          .map(({ text, to }) => {
            if (to) {
              return (
                <li key={text} className="padding-right-1">
                  <CustomLink to={to}>{text}</CustomLink>
                </li>
              )
            }
            return (
              <li key={text} className="padding-left-1 text-bold">
                {text}
              </li>
            )
          })
          .reduce((prev, curr) => [prev, '> ', curr])}
      </ul>
    </div>
  )
}
