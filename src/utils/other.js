/* global ASSET_PATH */
/* global URLSearchParams */

import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { lower, run, startsWith, trim } from '@code.gov/cautious'
import siteConfig from '../../config/site/site.json'

export const falses = [undefined, null, 'null', 'None', 'Null', 'NULL', '', 'False', 'false']

export function isFalse(input) {
  return falses.includes(input)
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

export function getConfigValue(path) {
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


