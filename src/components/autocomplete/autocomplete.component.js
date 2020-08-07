import React from 'react'
import CustomLink from 'components/custom-link'

export default function Autocomplete({ onClick, options }) {
  return (
    <ul className="autocomplete bg-white border-1px border-primary margin-top-1px text-left z-100 padding-left-0">
      {options.map(option => {
        const { text, to } = option
        return (
          <li key={to}>
            <CustomLink
              onClick={() => onClick & onClick(option)}
              to={to}
              className="display-block padding-1 text-no-underline"
            >
              <i aria-label="search" className="icon icon-search" />
              <span className="text-black font-body-3xs padding-left-2px overflow-hidden text-no-wrap width-full display-inline-block text-bottom">
                {text}
              </span>
            </CustomLink>
          </li>
        )
      })}
    </ul>
  )
}
