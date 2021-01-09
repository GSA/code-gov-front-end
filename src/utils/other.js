/* global PUBLIC_PATH */
/* global SITE_CONFIG */
import { find, lower, startsWith, trim } from '@code.gov/cautious'
import get from 'lodash.get'

export const falses = [undefined, null, 'null', 'None', 'Null', 'NULL', '', 'False', 'false']

export function isFalse(input) {
  return falses.includes(input)
}

export function pathMatch(url, match) {
  return (
    startsWith(url, `./${match}`) || startsWith(url, `/${match}/`) || startsWith(url, `${match}/`)
  )
}

export function updatedRecursivePath(thing) {
  if (typeof thing === 'object') {
    for (const key in thing) {
      const subvalue = thing[key]
      if (typeof subvalue === 'string') {
        // eslint-disable-next-line no-use-before-define
        thing[key] = adjustAssetPath(subvalue)
      }
    }
  }
  return thing
}

export function adjustAssetPath(thing) {
  if (pathMatch(thing, 'assets')) {
    const pattern = /.?\/?assets\//
    const newAssetPath = `${PUBLIC_PATH}assets/`
    return thing.replace(pattern, newAssetPath)
  }

  return updatedRecursivePath(thing)
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
          for (const subkey in item) {
            const subvalue = item[subkey]
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
      or consult our developer documentation here: https://open.gsa.gov/api/codedotgov/`)
    }
    return value
  }
  return null
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
  const headerHeight = document.querySelector('.menu-banner-header').clientHeight
  const bannerHeight = document.querySelector('.usa-section').clientHeight
  const scrollDepth = headerHeight + bannerHeight
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
        } else if (isFalse(value) === false) {
          results.add(value)
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
        } else if (isFalse(value) === false) {
          results.add(value.toLowerCase())
        }
      }
    })
  }
  return results
}

export function getFilterData(key, path, currentSearchResults, filters) {
  if (currentSearchResults && filters && filters[key]) {
    const names = getLowerSet(currentSearchResults.repos, path)
    return filters[key].filter(
      ({ name, value }) => names.has(normalize(name)) || names.has(normalize(value))
    )
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

export function getFilterValuesFromParamsByCategory(params = {}, category) {
  console.log('other-getFilter: category', category)
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
        /* eslint-disable */
        if (found.name) title = found.name
        if (found.value) value = found.value
        /* eslint-enable */
      }
      return { category, modified, value, title }
    })
    .sort((a, b) => Math.sign(a.modified - b.modified))
}

export function loadScript(src) {
  console.log('starting loadScript with', src)
  return new Promise((resolve, _reject) => {
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
          value,
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
    const xhr = new XMLHttpRequest()
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

// https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
export function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s']+)/g
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`)
}

export function prettify(text) {
  // convert (1) cost: to \n\t(1) <b>cost</b>:
  const bulletRegex = /\(\d{1,2}\) [A-Za-z]{1,25}:/g
  return urlify(text).replace(
    bulletRegex,
    match => `<br/>${match.replace(/[A-Za-z]{1,25}/, name => `<b>${name}</b>`)}`
  )
}

export const isHomepage = window.location.pathname === PUBLIC_PATH
