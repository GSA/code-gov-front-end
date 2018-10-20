import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { some } from '@code.gov/cautious'

export default function SecondaryDropdown({ menuOption, onClick }) {
  if (some(menuOption.links)) {
    return (
      <ul role="menu">
        {menuOption.links.map(link => {
          return (
            <li key={link.url} role="none">
              <Link to={link.url}>{link.name}</Link>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return <Fragment></Fragment>
  }
}
