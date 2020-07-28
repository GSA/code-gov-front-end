import React from 'react'
import CustomLink from 'components/custom-link'
import { startsWith } from '@code.gov/cautious'

export default function LinkPart({ name, onClick, url }) {
  if (startsWith(url, 'http') || startsWith(url, 'mailto')) {
    return (
      <a
        href={url}
        onClick={onClick}
        className=""
        data-testid="link-part-anchor"
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        {name}
      </a>
    )
  }

  return (
    <CustomLink to={url} onClick={onClick}>
      {name}
    </CustomLink>
  )
}
