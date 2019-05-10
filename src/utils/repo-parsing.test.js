import {
  getDisplayTextForUsageType,
  getLicenseName,
  getLaborHours,
  parseLanguages,
  parseEmail,
  parseRepositoryURL,
  parseTags,
  getLastModifiedDateString,
} from 'utils/repo-parsing'

describe('utils - repo-parsing', () => {
  describe('getDisplayTextForUsageType', () => {
    it('should return `Open Source` for `openSource` usage types', () => {
      const repo = { permissions: { usageType: 'openSource' } }
      expect(getDisplayTextForUsageType(repo)).toBe('Open Source')
    })

    it('should return `Gov-wide Reuse` for `governmentWideReuse` usage types', () => {
      const repo = { permissions: { usageType: 'governmentWideReuse' } }
      expect(getDisplayTextForUsageType(repo)).toBe('Gov-wide Reuse')
    })

    it('should return other usage types as is', () => {
      const repo = { permissions: { usageType: 'other-type' } }
      expect(getDisplayTextForUsageType(repo)).toBe('other-type')
    })

    it('should return `unknown` if it cannot get a usage type', () => {
      expect(getDisplayTextForUsageType({})).toBe('unknown')
    })
  })

  describe('getLicenseName', () => {
    it('should get the `name` of the first licsence', () => {
      const repo = { permissions: { licenses: [{ name: 'name-1' }, { name: 'name-2' }] } }
      expect(getLicenseName(repo)).toBe('name-1')
    })

    it('should return falsy if it cannot get a license name', () => {
      expect(getLicenseName({})).toBeFalsy()
    })
  })

  describe('getLaborHours', () => {
    it('should return the labor hours as a number', () => {
      const repo = { contact: { laborHours: '123' } }
      expect(getLaborHours(repo)).toBe(123)
    })

    it('should return falsy if it cannot get valid labor hours', () => {
      expect(getLaborHours({})).toBeFalsy()
      expect(getLaborHours({ contact: { laborHours: -100 } })).toBeFalsy()
    })
  })

  describe('parseLanguages', () => {
    it('should return truthy languages', () => {
      const repo = { languages: ['lang-1', null, false, 'lang-2'] }
      expect(parseLanguages(repo)).toEqual(['lang-1', 'lang-2'])
    })

    it('should return an empty array if no languages found', () => {
      expect(parseLanguages({})).toEqual([])
    })
  })

  describe('parseEmail', () => {
    it('should return a email', () => {
      const repo = { contact: { email: 'test-email' } }
      expect(parseEmail(repo)).toEqual('test-email')
    })

    it('should return falsy if no valid email found', () => {
      expect(parseEmail({})).toBeFalsy()
    })
  })

  describe('parseRepositoryURL', () => {
    it('should return a url', () => {
      const repo = { repositoryURL: 'http://test-url.com' }
      expect(parseRepositoryURL(repo)).toEqual('http://test-url.com')
    })

    it('should normalize `git` urls', () => {
      expect(parseRepositoryURL({ repositoryURL: 'git://github.com/test-url' })).toEqual('https://github.com/test-url')
      expect(parseRepositoryURL({ repositoryURL: 'git@github.com:test-url.git' })).toEqual('https://github.com/test-url')
      expect(parseRepositoryURL({ repositoryURL: 'https://github.com/test-url.git' })).toEqual('https://github.com/test-url')
    })

    it('should return falsy if no valid url found', () => {
      expect(parseRepositoryURL({})).toBeFalsy()
    })
  })

  describe('parseTags', () => {
    it('should get truthy tags', () => {
      const repo = { tags: ['tag-1', null, false, 'tag-2'] }
      expect(parseTags(repo)).toEqual(['tag-1', 'tag-2'])
    })

    it('should return an empty array if no tags found', () => {
      expect(parseTags({})).toEqual([])
    })
  })

  describe('getLastModifiedDateString', () => {
    it('should get the date last modified as a local string', () => {
      const repo = { date: { lastModified: '2011/01/02' } }
      expect(getLastModifiedDateString(repo)).toEqual(new Date('2011/01/02').toLocaleDateString('en-US'))
    })

    it('should return falsy if no date found', () => {
      expect(getLastModifiedDateString({})).toBeFalsy()
    })

    xit('should catch errors', () => {
      // BUG: should check if valid date, not just exists
      const repo = { date: { lastModified: 'not valid date' } }
      getLastModifiedDateString(repo)
      expect(console.warn).toBeCalled()
    })
  })
})