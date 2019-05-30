import { last, range } from '@code.gov/cautious'

export function getPageInfo(params) {
  const { count, pagesize } = params
  const pagecount = Math.ceil(count / pagesize)
  const pageIndexes = range(pagecount)
    .map(n => n + 1) // convert from starting at 0 to 1
  const pageCount = pageIndexes.length

  return { pageIndexes, pageCount }
}

export function getPaginationNavInfo(params) {
  const { pageIndexes, page } = params
  const ultimate = last(pageIndexes)
  const left = page - 1
  const right = page + 1

  return { ultimate, left, right }
}
