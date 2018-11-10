import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { some, startsWith } from '@code.gov/cautious'

function LinkPart({name, onClick, url}) {
  if (startsWith(url, 'https')) {
    return <a href={url} onClick={onClick} target='_blank'>{name}</a>
  } else {
    return <Link to={url} onClick={onClick}>{name}</Link>
  }
}

export default function SecondaryDropdown({ menuOption, onClick }) {
  if (some(menuOption.links)) {
    return (
      <ul role="menu">
        {menuOption.links.map(link =>{
          const { name, url } = link
          return <li key={url}><LinkPart name={name} onClick={onClick} url={url} /></li>
        })}
      </ul>
    )
  } else {
    return <Fragment></Fragment>
  }
}
