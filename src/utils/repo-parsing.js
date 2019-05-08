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
    const laborHours =  Number(get(repo, 'contact.laborHours'))
    if (laborHours > 0) {
      return laborHours
    }
  } catch (error){
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
  if (Boolean(email)) {
    return email
  }
}

export function parseRepositoryURL(repo) {
  const url = get(repo, 'repositoryURL')

  if (url) {
    if (url.startsWith('git://github.com/')) {
      return url.replace('git://github.com/', 'https://github.com/')
    }

    if (url.startsWith('git@github.com:')) {
      return url.replace('git@github.com:', 'https://github.com/')
        .replace('.git', '')
    }

    if (url.startsWith('https://github.com') && url.endsWith('.git')) {
      return url.replace('.git', '')
    }
  }
}

export function parseTags(repo) {
  try {
    return get(repo, 'tags').filter(Boolean)
  } catch (error) {
    return []
  }
}


export function getLastModifiedDateString(repo) {
  try {
    const dateLastModified = getDate(repo)
    if (dateLastModified) {
      return new Date(dateLastModified).toLocaleDateString()
    }
  } catch (error) {
    console.warn(error)
  }
}

export function getDate(item) {
  return get(item, 'ghUpdatedAt') || get(item, 'date.lastModified')
}
