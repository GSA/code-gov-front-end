import React from 'react'
import { shallow } from 'enzyme'

import repo from 'mocks/repo'
import { testRenderText, testRenderList, testRenderEmpty } from 'testUtils/render'
import CustomLink from 'components/custom-link'
import ProjectPage from 'components/project-page/project-page.component'

const props = {
  repo,
  match: {
    params: {
      repoID: 'repo-id'
    }
  },
  updateProject: jest.fn()
}

let wrapper
let instance
describe('components - ProjectPage', () => {
  beforeEach(() => {
    wrapper = shallow(<ProjectPage {...props} />)
    instance = wrapper.instance()
  })

  it('should update the project if it is initalized with the wrong repo', () => {
    wrapper = shallow(<ProjectPage {...props} repo={{ ...repo, repoID: 'other-id' }} />)
    expect(props.updateProject).toBeCalledWith(props.match.params.repoID)
  })

  describe('lastModifiedDateHTML', () => {
    it('should render the last modified date', () => {
      const expected = new Date(props.repo.date.lastModified).toLocaleDateString('en-US')
      testRenderText(instance.lastModifiedDateHTML, expected)
    })

    it('should render nothing if no last modfified date', () => {
      wrapper.setProps({ repo: { ...repo, date: undefined } })
      testRenderEmpty(instance.lastModifiedDateHTML)
    })
  })

  describe('repoTags', () => {
    it('should render the `tags` as links', () => {
      testRenderList(instance.repoTags, CustomLink, props.repo.tags.length)
    })
  })

  describe('usageType', () => {
    it('should render `Open Source` text if the usage type is open source', () => {
      wrapper.setProps({ repo: { ...repo, permissions: { usageType: 'openSource' } } })
      testRenderText(instance.usageType, 'Open Source')
    })

    it('should render `Government-Wide Reuse` text if the usage type is gov wide reuse', () => {
      wrapper.setProps({ repo: { ...repo, permissions: { usageType: 'governmentWideReuse' } } })
      testRenderText(instance.usageType, 'Government-Wide Reuse')
    })

    it('should render nothing if the usage type is neither open source nor gov wide reuse', () => {
      testRenderEmpty(instance.usageType)
    })
  })

  describe('license', () => {
    it('should render the license', () => {
      testRenderText(instance.license, repo.permissions.licenses[0].name)
    })

    it('should render nothing if license is not provided', () => {
      wrapper.setProps({ repo: { ...repo, permissions: undefined } })
      testRenderEmpty(instance.license)
    })
  })

  describe('displayLaborHours', () => {
    it('should render the labor hours', () => {
      testRenderText(instance.displayLaborHours, repo.contact.laborHours)
    })

    it('should render nothing if labor hours is not provided', () => {
      wrapper.setProps({ repo: { ...repo, contact: undefined } })
      testRenderEmpty(instance.displayLaborHours)
    })
  })

  describe('languages', () => {
    it('should render the `languages`', () => {
      const expected = repo.languages.join(', ')
      testRenderText(instance.languages, expected)
    })

    it('should render nothing if `languages` is not provided', () => {
      wrapper.setProps({ repo: { ...repo, languages: undefined } })
      testRenderEmpty(instance.languages)
    })
  })

  describe('contact', () => {
    it('should render the `email`', () => {
      testRenderText(instance.contact, props.repo.contact.email)
    })

    it('should render nothing if `email` is not provided', () => {
      wrapper.setProps({ repo: { ...repo, contact: undefined } })
      testRenderEmpty(instance.contact)
    })
  })

  describe('repositoryURL', () => {
    it('should render the repo url', () => {
      testRenderText(instance.repositoryURL, 'Visit Repo')
    })

    it('should render nothing if `email` is not provided', () => {
      wrapper.setProps({ repo: { ...repo, repositoryURL: undefined } })
      testRenderEmpty(instance.repositoryURL)
    })

    it('should render nothing if `repositoryURL` is a null string', () => {
      wrapper.setProps({ repo: { ...repo, repositoryURL: 'null' } })
      testRenderEmpty(instance.repositoryURL)
    })
  })

  describe('additionalData', () => {
    it('should render the additional repo data', () => {
      const expected = Object.keys(props.repo.additional_data).length
      testRenderList(instance.additionalData, '.metadata-value', expected)
    })

    it('should render nothing if additional data exists but has no values', () => {
      wrapper.setProps({ repo: { ...repo, additional_data: {} } })
      testRenderEmpty(instance.additionalData)
    })

    it('should render nothing if additional data is not provided', () => {
      wrapper.setProps({ repo: { ...repo, additional_data: undefined } })
      testRenderEmpty(instance.additionalData)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render a loading indicator if no repo', () => {
      wrapper.setProps({ repo: undefined })
      expect(wrapper.text()).toMatch(/loading/i)
    })
  })
})
