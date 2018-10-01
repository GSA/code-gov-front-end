import get from 'lodash.get'

export const falses = [undefined, null, 'null', 'None', 'Null', 'NULL', '', 'False', 'false']

export function isFalse(input) {
  return falses.includes(input)
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

/* lower case the input, including any elements in it */
export function lower(input) {
  if (Array.isArray(input)) {
    return input.map(item => item.toLowerCase())
  } else if (typeof input === 'object' && input.has && input.add) {
    return Set(Array.from(input).map(item => item.toLowerCase()))
  } else if (typeof input === "string") {
    return input.toLowerCase()
  }
}

export function trim(input) {
  if (Array.isArray(input)) {
    return input.map(item => item.trim())
  } else if (typeof input === 'object' && input.has && input.add) {
    return Set(Array.from(input).map(item => item.trim()))
  } else if (typeof input === "string") {
    return input.trim()
  }
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
      return names.has(name.toLowerCase()) || names.has(value.toLowerCase())
    })
  }
}

export function hasLicense(repo) {
  return repo.permissions && Array.isArray(repo.permissions.licenses) && repo.permissions.licenses.length > 0
}
