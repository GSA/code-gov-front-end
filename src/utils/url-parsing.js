/* global URLSearchParams */

export function getParamAsArray(params, key) {
  if (params.has(key)) {
    return params.get(key)
      .split(',')
      .map(item => item.toLowerCase().trim())
  }
}

export function getParamAsNumber(params, key) {
  if (params.has(key)) {
    return Number(params.get(key).toLowerCase().trim())
  }
}

export function getParamAsString(params, key) {
  if (params.has(key)) {
    return params.get(key).toLowerCase().trim()
  }
}

export function getNormalizedURLSearchParams() {
  const params = new URLSearchParams(window.location.search)
  return {
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
