const repo = {
  repoID: 'repo-id',
  name: 'repo-name',
  repositoryURL: 'https://github.com/repo-url',
  description: 'repo-desc',
  score: 'repo-score',
  agency: {
    name: 'repo-agency-name',
    acronym: 'repo-agency-acronym',
  },
  date: {
    lastModified: '2020/12/10',
  },
  permissions: {
    usageType: 'repo-usage',
    licenses: [{ name: 'repo-license' }],
  },
  contact: {
    laborHours: '123',
    email: 'repo-email',
  },
  tags: ['repo-tag-1', 'repo-tag-2'],
  languages: ['repo-lang-1', 'repo-lang-2'],
  additional_data: {
    array: ['repo-meta-arr-1'],
    url: 'http://www.repo-meta-url.com',
    string: 'repo-meta-string',
  },
}

export const getRepo = (overrides) => ({
  ...repo,
  ...overrides,
})

export default repo