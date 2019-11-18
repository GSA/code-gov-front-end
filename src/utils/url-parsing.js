/*
This function safely decodes the search part of a URL.
Example: '?page=1&query=space&size=10&sort=best_match'

It catches errors and logs them instead of throwing them
because we don't want a page to fail to load just because
there might be one part of a URL that is causing issues.
*/
export function getURLSearchParamsAsSimpleObj(search) {
  /* eslint-disable */
  search = search || window.location.search
  /* eslint-enable */
  if (search && typeof search === 'string') {
    return search
      .substring(1)
      .split('&')
      .reduce((result, part) => {
        try {
          if (part && part.includes('=')) {
            const [key, value] = part.split('=')
            result[key] = decodeURIComponent(value)
          }
        } catch (error) {
          console.error(error)
        }
        return result
      }, {})
  }
  return {}
}

export function convertObjToSortedSearchString(obj) {
  return Object.keys(obj)
    .sort() // sort keys alphabetically
    .map(key => [key, obj[key]])
    .map(([key, value]) => {
      console.warn('sorting value:', [key, value])
      if (Array.isArray(value)) {
        return [key, value.sort()]
      }
      return [key, value]
    })
    .reduce(
      (result, [key, value]) =>
        `${result}&${key}=${encodeURIComponent(Array.isArray(value) ? value.join(',') : value)}`,
      ''
    )
}

convertObjToSortedSearchString(getURLSearchParamsAsSimpleObj(window.location.search))

export function getParamAsArray(params, key) {
  if (params[key]) {
    return params[key].split(',').map(item => item.trim())
  }
}

export function getParamAsNumber(params, key) {
  if (params[key]) {
    return Number(params[key].trim())
  }
}

export function getParamAsString(params, key) {
  if (params[key]) {
    return params[key].trim()
  }
}

export function getNormalizedURLSearchParams(search) {
  const params = getURLSearchParamsAsSimpleObj(search || window.location.search)
  return {
    agencies: getParamAsArray(params, 'agencies'),
    languages: getParamAsArray(params, 'languages'),
    licenses: getParamAsArray(params, 'licenses'),
    skillLevels: getParamAsArray(params, 'skillLevels'),
    timeRequired: getParamAsArray(params, 'timeRequired'),
    usageType: getParamAsArray(params, 'usageType'),
    page: getParamAsNumber(params, 'page'),
    sort: getParamAsString(params, 'sort'),
    query: getParamAsString(params, 'query')
  }
}

export function getSearchFromUrl(url) {
  const searchMatch = url.match(/\?.*/)
  if (searchMatch) {
    return searchMatch[0]
  }
}

export function getSection() {
  const pathname = window.location.pathname
  if (pathname.includes('/browse-projects')) {
    return 'browse'
  }
  if (pathname.includes('/search')) {
    return 'search'
  }
  if (pathname.includes('/open-tasks')) {
    return 'tasks'
  }
  if (pathname.includes('/projects/')) {
    return 'project'
  }
}
