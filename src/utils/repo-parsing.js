import get from 'lodash.get'
import { filter } from '@code.gov/cautious'

export function getDisplayTextForUsageType(repo) {
  let text = ''
  const usageType = get(repo, 'permissions.usageType')
  if (usageType === 'openSource') {
    text = 'Open Source'
  } else if (usageType === 'governmentWideReuse') {
    text = 'Gov-wide Reuse'
  } else if (usageType) {
    text = usageType
  } else {
    text = 'unknown'
  }
  return text
}

export function getLicenseName(repo) {
  return get(repo, 'permissions.licenses[0].name')
}

export function getLaborHours(repo) {
  try {
    const laborHours = Number(get(repo, 'contact.laborHours'))
    if (laborHours > 0) {
      return laborHours
    }
  } catch (error) {
    console.warn(error)
  }
}

export function parseLanguages(repo) {
  const languages = get(repo, 'languages')
  if (Array.isArray(languages)) {
    return filter(languages, Boolean)
  }
  return []
}

export function parseEmail(repo) {
  const email = get(repo, 'contact.email')
  if (email) {
    return email
  }
}

export function parseRepositoryURL(repo) {
  let url = get(repo, 'repositoryURL')

  // some repos return 'null'
  if (!url || url === 'null') {
    return ''
  }

  if (url.startsWith('git://github.com/')) {
    url = url.replace('git://github.com/', 'https://github.com/')
  } else if (url.startsWith('git@github.com:')) {
    url = url.replace('git@github.com:', 'https://github.com/').replace('.git', '')
  } else if (url.startsWith('https://github.com') && url.endsWith('.git')) {
    url = url.replace('.git', '')
  }

  return url
}

export function parseTags(repo) {
  try {
    return get(repo, 'tags').filter(Boolean)
  } catch (error) {
    return []
  }
}

export function getDate(item) {
  return get(item, 'ghUpdatedAt') || get(item, 'date.lastModified')
}

export function getLastModifiedDateString(repo) {
  try {
    const dateLastModified = getDate(repo)
    if (dateLastModified) {
      return new Date(dateLastModified).toLocaleDateString('en-US')
    }
  } catch (error) {
    console.warn(error)
  }
}
