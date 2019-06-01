/* global PUBLIC_PATH */
/* global SITE_CONFIG */
import get from 'lodash.get'
import { find, lower, startsWith, trim } from '@code.gov/cautious'

export const falses = [undefined, null, 'null', 'None', 'Null', 'NULL', '', 'False', 'false']

export function isFalse(input) {
  return falses.includes(input)
}

export function adjustAssetPath(thing) {
  const pattern = /.?\/?assets\//
  const newAssetPath = `${PUBLIC_PATH}assets/`
  if (
    startsWith(thing, './assets') ||
    startsWith(thing, '/assets/') ||
    startsWith(thing, 'assets/')
  ) {
    return thing.replace(pattern, newAssetPath)
  }

  return thing
}

export function getConfigValue(path) {
  if (SITE_CONFIG) {
    let value = get(SITE_CONFIG, path)
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
      })
    }
    if (!value) {
      console.warn(`We weren't able to find the value for ${path} in your code-gov-config.json file.
      You can consult examples under the folder found at config/site/examples
      or consult our developer documentation here: https://developers.code.gov/configure.html`)
    }
    return value
  } else {
    return null
  }
}

export function normalize(input) {
  return trim(lower(input))
}

export function setScrollDepth(scrollDepth) {
  if (document && document.documentElement && document.documentElement.scrollTop) {
    document.documentElement.scrollTop = scrollDepth
  }
  if (document.body && document.body.scrollTop) {
    document.body.scrollTop = scrollDepth
  }
}

/* runs when each page component is loaded */
export function refreshView() {
  window.scrollTo(0, 0)
  setScrollDepth(0)
  if (document.activeElement) {
    document.activeElement.blur()
  }
}

export function scrollToTopOfResults() {
  console.log('starting scrollToTopOfResults')
  const headerHeight = document.querySelector('header.main').clientHeight
  const bannerHeight = document.querySelector('.banner').clientHeight
  const navHeight = document.querySelector('header.main nav').clientHeight
  const scrollDepth = headerHeight + bannerHeight - navHeight
  const scrollOptionsSupported = document.documentElement.style.scrollBehavior !== undefined
  if (scrollOptionsSupported) {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: scrollDepth
    })
  } else {
    window.scrollTo(0, scrollDepth)
  }
  setScrollDepth(scrollDepth)
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
          if (isFalse(value) === false) {
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
  return (
    repo.permissions &&
    Array.isArray(repo.permissions.licenses) &&
    repo.permissions.licenses.length > 0
  )
}

export function now() {
  return new Date().getTime()
}

export function getFilterValuesFromParamsByCategory(params, category) {
  return params.filters
    .filter(entry => entry.category === category)
    .map(entry => entry.value)
    .map(value => (typeof value === 'string' ? value.toLowerCase().trim() : value))
}

export function getFilterTags(params, filters) {
  return params.filters
    .map(({ category, modified, value }) => {
      const normalizedValue = value.toLowerCase()
      const found = find(
        get(filters, category),
        item => item.value.toLowerCase() === normalizedValue
      )
      let title = 'loading'
      if (found) {
        if (found.name) title = found.name
        if (found.value) value = found.value
      }
      return { category, modified, value, title }
    })
    .sort((a, b) => Math.sign(a.modified - b.modified))
}

export function loadScript(src) {
  console.log('starting loadScript with', src)
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    document.body.appendChild(script)
    console.log('appended:', script, 'to body')
  })
}

export function fillFilters(keys, params, result) {
  keys.forEach(key => {
    if (Array.isArray(params[key])) {
      params[key].forEach(value => {
        result.filters.push({
          category: key,
          value: value,
          modified: now()
        })
      })
    }
  })
}

export function onHomePage() {
  return window.location.pathname === PUBLIC_PATH
}

/* I'd prefer to use fetch but IE polyfilling is complicated */
export function getText(url) {
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        resolve(xhr.response)
      }
    }
    xhr.open('GET', url, true)
    xhr.send('')
  })
}

export function getJSON(url) {
  return getText(url).then(JSON.parse)
}
