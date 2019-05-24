import React, { Fragment } from 'react'
import { some } from '@code.gov/cautious'

import LinkPart from './link-part'

export default function SecondaryDropdown({ menuOption, onClick }) {
  if (some(menuOption.links)) {
    return (
      <ul role="menu">
        {menuOption.links.map(link => {
          const { name, url } = link
          return (
            <li key={url}>
              <LinkPart name={name} onClick={onClick} url={url} />
            </li>
          )
        })}
      </ul>
    )
  }

  return <Fragment />
}
