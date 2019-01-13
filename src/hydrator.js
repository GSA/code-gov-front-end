import { clone } from '@code.gov/cautious'
import get from 'lodash.get'
import set from 'lodash.set'
import defaultState from 'constants/default-redux-store-state'
import mapping from 'constants/url-param-to-store'
import { getNormalizedURLSearchParams, getSection } from 'utils/url-parsing'
import { now } from 'utils/other'

const taskParams = [
  'agencies',
  'languages',
  'licenses',
  'skillLevels',
  'timeRequired',
  'usageTypes'
]
const searchParams = ['page', 'query', 'size', 'sort']

function setFilters(initialState, path, value, key) {
  const filters = get(initialState, path)
  value.forEach(item => {
    filters.push({ category: key, value: item, modified: now() })
  })
}

export function hydrate() {
  const initialState = clone(defaultState)
  const section = getSection()
  if (section) {
    const parsed = getNormalizedURLSearchParams()

    for (const key in parsed) {
      const value = parsed[key]
      if (value) {
        const path = mapping[section][key]
        if (searchParams.includes(key)) {
          set(initialState, path, value)
        } else if (taskParams.includes(key)) {
          setFilters(initialState, path, value, key)
        }
      }
    }
  }

  return initialState
}
