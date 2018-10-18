import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { run } from './safely'

export function overlaps(array1, array2) {
  return array1.some(item => array2.includes(item))
}

export const falses = [undefined, null, 'null', 'None', 'Null', 'NULL', '', 'False', 'false']

export function isFalse(input) {
  return falses.includes(input)
}

export function isSet(input) {
  return input && typeof input === 'object' && input.has && input.add
}

export function getConfigValue(siteConfig, path) {
  if (siteConfig) {
    const value = get(siteConfig, path)
    if (!value) {
      console.warn(`We weren't able to find the value for ${path} in your code-gov-config.json file.
      You can consult examples under the folder found at config/site/examples
      or consult our developer documentation here: https://developers.code.gov/configure.html`)
    }
    return value
  }
  else {
    return null
  }
}

export function normalize(input) {
  return trim(lower(input))
}

export function includes(items, item) {
  try {
    return items.includes(item)
  } catch (error) {
    return false
  }
}

export function onEachItem(input, func) {
  if (Array.isArray(input)) {
    return input.map(item => run(item, func))
  } else if (isSet(input)) {
    return Set(Array.from(input).map(item => run(item, func)))
  } else {
    return run(input, func) 
  }
}

export function lower(input) {
  return onEachItem(input, 'toLowerCase')
}

export function upper(input) {
  return onEachItem(input, 'toUpperCase')
}

export function trim(input) {
  return onEachItem(input, 'trim')
}

/* runs when each page component is loaded */
export function refreshView() {
  window.scrollTo(0, 0)
  document.activeElement.blur()
}

/* gets a set of values given a path */
export function getSet(items, path) {
  const results = new Set()
  if (Array.isArray(items) && typeof path === 'string') {
    items.forEach(item => {
      const value = get(item, path)
      if (value && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(subitem => {
            if (isFalse(subitem) === false) {
              results.add(subitem)
            }
          })
        } else {
          if (isFalse(value) === false) {
            results.add(value)
          }
        }
      }
    })
  }
  return results
}

export function getLowerSet(items, path) {
  const results = new Set()
  if (Array.isArray(items) && typeof path === 'string') {
    items.forEach(item => {
      const value = get(item, path)
      if (value && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(subitem => {
            if (isFalse(subitem) === false) {
              results.add(subitem.toLowerCase())
            }
          })
        } else {
          if(isFalse(value) === false) {
            results.add(value.toLowerCase())
          }
        }
      }
    })
  }
  return results
}

export function getFilterData(key, path, currentSearchResults, filters) {
  if (currentSearchResults && filters && filters[key]) {
    const names = getLowerSet(currentSearchResults.repos, path)
    return filters[key].filter(({ name, value }) => {
      return names.has(normalize(name)) || names.has(normalize(value))
    })
  }
}

export function hasLicense(repo) {
  return repo.permissions && Array.isArray(repo.permissions.licenses) && repo.permissions.licenses.length > 0
}

export function hasItems(array) {
  return Array.isArray(array) && array.length > 0
} 
