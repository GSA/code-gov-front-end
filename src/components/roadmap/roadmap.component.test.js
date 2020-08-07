import React from 'react'
import { shallow } from 'enzyme'

import { testRenderList } from 'testUtils/render'
import * as utilOther from 'utils/other'
import Roadmap, { Row, Column } from 'components/roadmap/roadmap.component'

jest.spyOn(utilOther, 'refreshView')

const props = {
  disclaimer: 'test-disclaimer',
  long: [
    { name: 'long-1', status: null },
    { name: 'long-1', status: 'In Progress' }
  ],
  mid: [
    { name: 'mid-1', status: 'Released' },
    { name: 'mid-1', status: 'Released' }
  ],
  near: [
    { name: 'near-1', status: 'In Progress' },
    { name: 'near-1', status: 'Released' }
  ],
  overview: ['overview-1', 'overview-2']
}

let wrapper
let instance
describe('components - Roadmap', () => {
  beforeEach(() => {
    wrapper = shallow(<Roadmap {...props} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(utilOther.refreshView).toBeCalled()
    })
  })

  describe('overview', () => {
    it('should render the `overview` paragraphs', () => {
      testRenderList(instance.overview, 'p', props.overview.length)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})

const rowProps = {
  todo: { name: 'todo-name', status: 'Released' }
}

describe('components - Roadmap - Row', () => {
  beforeEach(() => {
    wrapper = shallow(<Row {...rowProps} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an `icon-circle` class if in progress', () => {
    wrapper.setProps({ todo: { ...rowProps.todo, status: 'in progress' } })
    expect(wrapper.find('i').prop('className')).toBe('icon icon-circle text-accent-warm-light')
  })

  it('should render an `icon` class if in progress', () => {
    wrapper.setProps({ todo: { ...rowProps.todo, status: null } })
    expect(wrapper.find('i').prop('className')).toBe('icon')
  })
})

const columnProps = {
  phase: 'test-phase',
  todos: [
    { name: 'todo-1', status: 'In Progress' },
    { name: 'todo-2', status: 'Released' }
  ]
}

describe('components - Roadmap - Column', () => {
  beforeEach(() => {
    wrapper = shallow(<Column {...columnProps} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the `todos` as `Row`s', () => {
    expect(wrapper.find(Row).length).toBe(columnProps.todos.length)
  })
})
