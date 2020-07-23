import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default function Breadcrumbs({ crumbs }) {
  return (
    <div className="grid-container" id="breadcrumbs">
      <nav
        className="usa-breadcrumb grid-row tablet-lg:margin-top-4 margin-top-2"
        aria-label="Breadcrumbs"
      >
        <ol className="usa-breadcrumb__list font-body-2xs">
          {crumbs.map(({ text, to }) => {
            if (to) {
              return (
                <li key={text} className="usa-breadcrumb__list-item">
                  <CustomLink to={to} className="usa-breadcrumb__link">
                    <span>{text}</span>
                  </CustomLink>
                </li>
              )
            }
            return (
              <li
                key={text}
                className="usa-breadcrumb__list-item usa-current text-bold"
                aria-current="page"
              >
                <span>{text}</span>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
