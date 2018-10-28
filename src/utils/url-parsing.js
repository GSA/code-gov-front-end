/* global URLSearchParams */

export function getParamAsArray(params, key) {
  if (params.has(key)) {
    return params.get(key)
      .split(',')
      .map(item => item.toLowerCase().trim())
  } else {
    return null
  }
}

export function getParamAsNumber(params, key) {
  if (params.has(key)) {
    return Number(params.get(key).toLowerCase().trim())
  } else {
    return null
  }
}

export function getParamAsString(params, key) {
  if (params.has(key)) {
    return params.get(key).toLowerCase().trim()
  } else {
    return null
  }
}

export function parseLocation(inpt) {
  const loc = inpt || window.location
  const pathname = loc.pathname
  const params = new URLSearchParams(loc.search)

  return {
    pathname,
    agencies: getParamAsArray(params, 'agencies'),
    languages: getParamAsArray(params, 'languages'),
    licenses: getParamAsArray(params, 'licenses'),
    skillLevels: getParamAsArray(params, 'skillLevels'),
    timeRequired: getParamAsArray(params, 'timeRequired'),
    page: getParamAsNumber(params, 'page'),
    sort: getParamAsString(params, 'sort'),
    query: getParamAsString(params, 'query')
  }
}
