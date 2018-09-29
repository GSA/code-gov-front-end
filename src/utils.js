import get from 'lodash.get'

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

/* runs when each page component is loaded */
export function refreshView() {
  window.scrollTo(0, 0)
  document.activeElement.blur()
}