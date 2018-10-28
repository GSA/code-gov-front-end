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
  } else {
    return []
  }
}

export function parseEmail(repo) {
  const email = get(repo, 'contact.email')
  if (Boolean(email)) {
    return email
  }
}

export function parseRepositoryURL(repo) {
  const url = get(repo, 'repositoryURL')
  if (Boolean(url)) {
    return url
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
    const dateLastModified = get(repo, 'date.lastModified') ||  get(repo, 'ghUpdatedAt')
    if (dateLastModified) {
      return new Date(dateLastModified).toLocaleDateString()
    }
  } catch (error) {
    console.warn(error)
  }
}
