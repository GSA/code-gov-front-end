import React from 'react'
import { map } from '@code.gov/cautious'
import FilterTag from 'components/filter-tag'

export default function({ filters, onClick }) {
  console.log('starting filtertags with filters', filters)
  return (
    <div className="filter-tags">
      {map(filters, ({ category, title, value }) => {
        console.log('category, title value', [category, title, value])
        const key = `${category}:${value}`
        console.log('key:', key)
        return (
          <FilterTag key={key} category={category} title={title} value={value} onClick={onClick} />
        )
      })}
    </div>
  )
}
