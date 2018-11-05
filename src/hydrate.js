import { clone } from '@code.gov/cautious'
import get from 'lodash.get'
import set from 'lodash.set'

import defaultState from 'constants/default-redux-store-state'
import validParams from 'constants/valid-params'
import mapping from 'constants/url-param-to-store'

import { getNormalizedURLSearchParams } from 'utils/url-parsing'
import { now } from 'utils/other'

function getSection() {
  const pathname = window.location.pathname
  if (pathname.includes('/browse-projects')) {
    return 'browse'
  } else if (pathname.includes('/search')) {
    return 'search'
  } else if (pathname.includes('/open-tasks')) {
    return 'tasks'
  } else if (pathname.includes('/projects/')) {
    return 'project'
  }
}

export default function hydrate() {

  const initialState = clone(defaultState)
  const section = getSection()
  if (section) {
    const parsed = getNormalizedURLSearchParams()

    for (let key in parsed) {
      const value = parsed[key]
      if (value) {
        const path = mapping[section][key]
        if (['page', 'query', 'size', 'sort'].includes(key)) {
          set(initialState, path, value)
        } else if (['agencies', 'languages', 'licenses', 'skillLevels', 'timeRequired', 'usageTypes'].includes(key)) {
          const filters = get(initialState, path)
          value.forEach(item => {
            filters.push({ category: key, value: item, modified: now() })
          })
        }
      }
    }
  }

  return initialState

/*



function getInitialParams(pagekey) {
  const pageParams
  const params = { filters: [] }
  for (let key in ) {
    const value = defaultState
  }


  validParams[pagename].array.forEach(category => {
    forEach(parsed[category], value => {
      params.push({ category, value, modified: getCurrentTime() })
    })
  })
  validParams[pagename].string.forEach(category => {
    if (parsed[category]) {
      params.push({ category: category, value: parsed[category], modified: getCurrentTime() })
    }
  })
  console.log("initialparams:", params)
  return params
}

if (pathname.includes('/browse-projects')) {
  initialState['browseParams'] = getInitialParams('browseParams')
} else if (pathname.includes('/search')) {
  initialState['searchParams'] = getInitialParams('searchParams')
} else if (pathname.includes('/open-tasks')) {
  initialState['taskParams'] = getInitialParams('taskParams')
} else if (pathname.includes('/projects/')) {
  initialState.repoID = last(pathname.split('/'))
}
*/
}