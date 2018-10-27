/*global ASSET_PATH */

import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { run, startsWith } from '@code.gov/cautious'

export const falses = [undefined, null, 'null', 'None', 'Null', 'NULL', '', 'False', 'false']

export function isFalse(input) {
  return falses.includes(input)
}

export function isSet(input) {
  return input && typeof input === 'object' && input.has && input.add
}

export function adjustAssetPath(thing) {
  const pattern = /.?\/?assets\//
  const newAssetPath = ASSET_PATH + 'assets/'
  if (startsWith(thing, './assets') || startsWith(thing, '/assets/') || startsWith(thing, 'assets/')) {
    return thing.replace(pattern, newAssetPath)
  } else if (typeof value === 'object') {
    for (let key in thing) {
      const subvalue = thing[key]
      if (typeof subvalue === 'string') {
        thing[key] = adjustAssetPath(subvalue)
      }
    }
    return thing
  } else {
    return thing
  }
}

export function getConfigValue(siteConfig, path) {
  if (siteConfig) {
    let value = get(siteConfig, path)
    if (typeof value === 'string') {
      try {
        value = adjustAssetPath(value)
      } catch (error) {
        console.error("couldn't check if the following started with assets", [value])
      }
    } else if (Array.isArray(value)) {
      value = value.map(item => {
        if (typeof item === 'object') {
          for (let subkey in item) {
            let subvalue = item[subkey]
            if (typeof subvalue === 'string') {
              item[subkey] = adjustAssetPath(subvalue)
            }
          }
        }
        return item
      });
    }
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


export function scrollToTopOfResults() {
  const headerHeight = document.querySelector("header.main").clientHeight
  const bannerHeight = document.querySelector(".banner").clientHeight
  const navHeight = document.querySelector("header.main nav").clientHeight
  const scrollDepth = headerHeight + bannerHeight - navHeight
  window.scrollTo(0, scrollDepth)
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

export function clean(string) {
  try {
    return string.toLowerCase().replace(/-/g,' ').trim()
  } catch (error) {
    return string
  }
}

export function sortByBestMatch(a, b) {
  return Number(a.searchScore) > Number(b.searchScore) ? -1 : 1
}

export function sortByName(a, b) {
  return clean(a.name) > clean(b.name) ? 1 : -1
}

export function getDate(repo, path) {

  if (repo.ghUpdatedAt) {
    return new Date(a.ghUpdatedAt).getTime()
  } else if (repo.date && repo.date.lastModified) {
    return new Date(a.date.lastModified).getTime()
  } else {
    return
  }
}

export function getTime(date) {
  try {
    if (date) {
      return new Date(date).getTime()
    } else {
      return -10e10
    }
  } catch (error) {
    return -10e10
  }
}

export function sortByDate(a, b) {
  try {
    const aDate = get(a, 'date.lastModified') || get(a, 'ghUpdatedAt')
    const bDate = get(b, 'date.lastModified') || get(b, 'ghUpdatedAt')
    const aTime = getTime(aDate)
    const bTime = getTime(bDate)
    return Math.sign(bTime - aTime) || 0;
  } catch (error) {
    return 0
  }
}

export function sortByDataQuality(a, b) {
  return Number(a.score) > Number(b.score) ? -1 : 1
}