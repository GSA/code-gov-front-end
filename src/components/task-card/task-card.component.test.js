import React from 'react'
import { shallow } from 'enzyme'

import { testRenderText, testRenderEmpty } from 'testUtils/render'
import TaskCard from 'components/task-card/task-card.component'

const props = {
  task: {
    title: 'task-title',
    issueURL: '/task-issue-url',
    description: 'task-desc',
    agency: {
      acronym: 'task-agency-acronym',
      name: 'task-agency-name'
    },
    date: {
      lastModified: '2020/12/10'
    }
  }
}

let wrapper
let instance
describe('components - TaskCard', () => {
  beforeEach(() => {
    wrapper = shallow(<TaskCard {...props} />)
    instance = wrapper.instance()
  })

  describe('cardTitle', () => {
    it('should render the tasks `title`', () => {
      testRenderText(instance.cardTitle, props.task.title)
    })

    it('should render a link to the tasks `issueURL`', () => {
      expect(
        shallow(instance.cardTitle)
          .find('a')
          .prop('href')
      ).toBe(props.task.issueURL)
    })

    it('should not render if the task has no `issueURL` or `title`', () => {
      wrapper.setProps({ task: { ...props.task, issueURL: undefined, title: undefined } })
      testRenderEmpty(instance.cardTitle)
    })
  })

  describe('cardDescription', () => {
    it('should render the tasks `description`', () => {
      testRenderText(instance.cardDescription, props.task.description)
    })

    it('should not render if the task has no `description`', () => {
      wrapper.setProps({ task: { ...props.task, description: undefined } })
      testRenderEmpty(instance.cardDescription)
    })
  })

  describe('agencyLink', () => {
    it('should render a custom link to the agency', () => {
      const link = shallow(<div>{instance.agencyLink}</div>).findWhere(x => x.prop('to'))
      expect(link.prop('to')).toMatch(props.task.agency.acronym)
      expect(link.prop('children')).toBe(props.task.agency.name)
    })

    it('should not render if the task has no agency `acronym` or `name`', () => {
      wrapper.setProps({ task: { ...props.task, agency: undefined } })
      testRenderEmpty(instance.agencyLink)
    })

    it('should render `Not Available` if no last modified date found', () => {
      wrapper.setProps({ task: { ...props.task, date: undefined } })
      testRenderEmpty(instance.cardDate)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
