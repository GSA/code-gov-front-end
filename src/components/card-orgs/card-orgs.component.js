import React, { Fragment } from 'react'
import { some } from '@code.gov/cautious'

export default function CardOrgs({ title, orgs }) {
  let organizations = ''
  const links = []
  let _links = []

  if (some(orgs)) {
    organizations = ''
    _links = orgs.map(org => ({
      org,
      link: `https://github.com/${org}`
    }))

    for (const [index, value] of _links.entries()) {
      if (index !== _links.length - 1) {
        links.push(
          <span key={index}>
            <a href={value.link}>{value.org}</a>
            {', '}
          </span>
        )
      } else {
        links.push(
          <span key={index}>
            <a href={value.link}>{value.org}</a>
          </span>
        )
      }
    }
  }

  return (
    <Fragment>
      <li>
        <span className="text-bold">{title}: </span>
        {links}
      </li>
    </Fragment>
  )
}
