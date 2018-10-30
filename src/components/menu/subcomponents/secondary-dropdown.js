import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { some, startsWith } from '@code.gov/cautious'

function LinkPart(name, url) {
  if (startsWith(url, 'https')) {
    return <a key={url} href={url} target='_blank'>{name}</a>
  } else {
    return <Link key={url} to={url}>{name}</Link>
  }
}

export default function SecondaryDropdown({ menuOption, onClick }) {
  if (some(menuOption.links)) {
    return (
      <ul role="menu">
        {menuOption.links.map(link =>{
          const { name, url } = link
          return LinkPart(name, url)
        })}
      </ul>
    )
  } else {
    return <Fragment></Fragment>
  }
}
