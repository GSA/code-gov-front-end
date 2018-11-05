export function setArrayAsParam(urlSearchParams, key, value) {
  if (urlSearchParams && Array.isArray(value) && value.length > 0) {
    urlSearchParams.set(key, value.join(','))
  }
}

export function setStringAsParam(urlSearchParams, key, value) {
  if (urlSearchParams && typeof value === 'string' && value.length > 0) {
    urlSearchParams.set(key, value)
  }
}

export function setNumberAsParam(urlSearchParams, key, value) {
  if (urlSearchParams && typeof value === 'number') {
    urlSearchParams.set(key, value)
  }
}