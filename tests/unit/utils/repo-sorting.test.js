import {
  clean,
  getTime,
  sortByBestMatch,
  sortByDataQuality,
  sortByDate,
  sortByName,
} from 'utils/repo-sorting'

import { restoreGetTime, mockGetTime } from 'mocks/date'

beforeAll(() => {
  restoreGetTime()
})

afterAll(() => {
  mockGetTime()
})

describe('utils - repo-sorting', () => {
  describe('clean', () => {
    it('should return a lowercased, trimmed string with no dashes', () => {
      expect(clean('   TEST-valUe  ')).toBe('test value')
      expect(clean('test valUe')).toBe('test value')
    })

    it('should return invalid strings as is', () => {
      expect(clean(1)).toBe(1)
      expect(clean({ test: 'VALUE' })).toEqual({ test: 'VALUE' })
    })
  })

  describe('getTime', () => {
    it('should return the date as a number', () => {
      expect(getTime('2018/01/04')).toBe(new Date('2018/01/04').getTime())
    })

    it('should return falsy values as `-10e10`', () => {
      expect(getTime(false)).toBe(-10e10)
    })
  })

  describe('sortByBestMatch', () => {
    it('should return -1 if the first search score is higher', () => {
      expect(sortByBestMatch({ searchScore: 99 }, { searchScore: 1 })).toBe(-1)
    })

    it('should return 1 if the second search score is higher', () => {
      expect(sortByBestMatch({ searchScore: 1 }, { searchScore: 99 })).toBe(1)
    })
  })

  describe('sortByDataQuality', () => {
    it('should return -1 if the first score is higher', () => {
      expect(sortByDataQuality({ score: 99 }, { score: 1 })).toBe(-1)
    })

    it('should return 1 if the second score is higher', () => {
      expect(sortByDataQuality({ score: 1 }, { score: 99 })).toBe(1)
    })
  })

  describe('sortByDate', () => {
    it('should return -1 if the first score is higher', () => {
      expect(sortByDate({ ghUpdatedAt: '2011/01/02' }, { ghUpdatedAt: '1969/01/02' })).toBe(-1)
    })

    it('should return 1 if the second score is higher', () => {
      expect(sortByDate({ ghUpdatedAt: '1969/01/02' }, { ghUpdatedAt: '2011/01/02' })).toBe(1)
    })

    it('should return 0 as a default value', () => {
      expect(sortByDate({}, {})).toBe(0)
    })
  })

  describe('sortByName', () => {
    it('should return -1 if the first name is higher', () => {
      expect(sortByName({ name: 'aaa' }, { name: 'zzz' })).toBe(-1)
    })

    it('should return 1 if the second name is higher', () => {
      expect(sortByName({ name: 'zzz' }, { name: 'aaa' })).toBe(1)
    })
  })
})