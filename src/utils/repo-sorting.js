import { getDate } from './repo-parsing'

export function clean(string) {
  try {
    return string
      .toLowerCase()
      .replace(/-/g, ' ')
      .trim()
  } catch (error) {
    return string
  }
}

export function getTime(date) {
  try {
    if (date) {
      return new Date(date).getTime()
    }
    return -10e10
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
    const aDate = getDate(a)
    const bDate = getDate(b)
    const aTime = getTime(aDate)
    const bTime = getTime(bDate)
    return Math.sign(bTime - aTime) || 0
  } catch (error) {
    console.error(error)
    return 0
  }
}

export function sortByName(a, b) {
  return clean(a.name) > clean(b.name) ? 1 : -1
}
