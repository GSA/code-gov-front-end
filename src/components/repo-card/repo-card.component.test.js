import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText, testRenderEmpty } from 'testUtils/render'
import repo from 'mocks/repo'
import RepoCard from 'components/repo-card/repo-card.component'

const props = {
  repo
}

let wrapper
let instance
describe('components - RepoCard', () => {
  beforeEach(() => {
    wrapper = shallow(<RepoCard {...props} />)
    instance = wrapper.instance()
  })

  describe('goToButton', () => {
    it('should render a link to the repo url', () => {
      const link = shallow(<div>{instance.goToButton}</div>)
        .find('a')
        .prop('href')
      expect(link).toBe(props.repo.repositoryURL)
    })

    it('should return nothing if the `repositoryURL` is not a string matching `github.com`', () => {
      wrapper.setProps({ repo: { ...props.repo, repositoryURL: 'not-matching-url' } })
      testRenderEmpty(instance.goToButton)

      wrapper.setProps({ repo: { ...props.repo, repositoryURL: undefined } })
      testRenderEmpty(instance.goToButton)
    })
  })

  describe('repoDescription', () => {
    it('should render the `description`', () => {
      testRenderText(instance.repoDescription, props.repo.description)
    })

    it('should return nothing if the `description` is not provided', () => {
      wrapper.setProps({ repo: { ...props.repo, description: undefined } })
      testRenderEmpty(instance.repoDescription)
    })
  })

  describe('repoLanguages', () => {
    it('should render the `languages` as the `text` prop', () => {
      const text = instance.repoLanguages.split(', ')

      expect(text.length).toBe(props.repo.languages.length)
    })

    it('should render `Not Available` as the `text` prop if no languages', () => {
      wrapper.setProps({ repo: { ...props.repo, languages: undefined } })
      const text = wrapper.find("CardPart[title='Languages']").prop('text')

      expect(text).toMatch(/Not Available/i)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
