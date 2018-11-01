import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { some, startsWith } from '@code.gov/cautious'

function LinkPart({name, url}) {
  if (startsWith(url, 'https')) {
    return <a href={url} target='_blank'>{name}</a>
  } else {
    return <Link to={url}>{name}</Link>
  }
}

export default function SecondaryDropdown({ menuOption, onClick }) {
  if (some(menuOption.links)) {
    return (
      <ul role="menu">
        {menuOption.links.map(link =>{
          const { name, url } = link
          return <li key={url}><LinkPart name={name} url={url} /></li>
        })}
      </ul>
    )
  } else {
    return <Fragment></Fragment>
  }
}
