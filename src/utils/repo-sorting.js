export function clean(string) {
  try {
    return string.toLowerCase().replace(/-/g,' ').trim()
  } catch (error) {
    return string
  }
}

export function getDate(repo, path) {
  if (repo.ghUpdatedAt) {
    return new Date(repo.ghUpdatedAt).getTime()
  } else if (repo.date && repo.date.lastModified) {
    return new Date(repo.date.lastModified).getTime()
  } else {
    return
  }
}

export function getTime(date) {
  try {
    if (date) {
      return new Date(date).getTime()
    } else {
      return -10e10
    }
  } catch (error) {
    return -10e10
  }
}

export function sortByBestMatch(a, b) {
  return Number(a.searchScore) > Number(b.searchScore) ? -1 : 1
}

export function sortByDataQuality(a, b) {
  return Number(a.score) > Number(b.score) ? -1 : 1
}

export function sortByDate(a, b) {
  try {
    const aDate = get(a, 'date.lastModified') || get(a, 'ghUpdatedAt')
    const bDate = get(b, 'date.lastModified') || get(b, 'ghUpdatedAt')
    const aTime = getTime(aDate)
    const bTime = getTime(bDate)
    return Math.sign(bTime - aTime) || 0;
  } catch (error) {
    return 0
  }
}

export function sortByName(a, b) {
  return clean(a.name) > clean(b.name) ? 1 : -1
}
