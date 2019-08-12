import React from 'react'
import { shallow } from 'enzyme'

import client from 'api-client'
import AboutPage from 'components/about-page'
import ComplianceDashboard from 'components/about-page/compliance-dashboard.component'
import InventoryCode from 'components/about-page/inventory-code.component'
import JSONValidator from 'components/about-page/json-validator.component'
import { eventMap, push } from '../../../tests/mocks/window'
import { refreshView, scrollToTopOfResults, loadScript } from '../../utils/other'

jest.mock('utils/other')
jest.spyOn(window.customElements, 'get')

// helper for testing the component does not make changes if it is `loading`
const testLoading = component => {
  jest.spyOn(component, 'setState')
  component.loading = true
  component.componentDidMount()
  expect(component.setState).not.toBeCalled()
}

// helper for testing the webcomponent loads if it does not exist
const testWebcomponentLoads = component => {
  window.customElements.get.mockImplementation(() => undefined)
  loadScript.mockReset()
  component.loading = false
  component.componentDidMount()
  expect(loadScript).toBeCalled()
}

// helper for testing the webcomponent does not load if it already exists
const testWebcomponentExists = component => {
  window.customElements.get.mockImplementation(() => 'component-exists')
  loadScript.mockReset()
  component.loading = false
  component.componentDidMount()
  expect(loadScript).not.toBeCalled()
}

const compliances = [
  { name: 'agency-1-name', acronym: 'DOD', img: 'agency-1-img' },
  { name: 'agency-2-name', acronym: 'DOE', img: 'agency-2-img' },
  { name: 'agency-3-name', acronym: 'agency-3-acronym', img: 'agency-3-img' } // not on dashboard list
]

const props = {}

let wrapper
let instance
describe('components - AboutPage', () => {
  beforeEach(() => {
    wrapper = shallow(<AboutPage {...props} />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should refresh the view', () => {
      expect(refreshView).toBeCalled()
    })

    it('should attach a `popstate` event listener for scrolling to the top of results', () => {
      // pathname does not start with `policy-guide/`, no scrolling
      eventMap.popstate()
      expect(scrollToTopOfResults).not.toBeCalled()
      // pathname starts with `PUBLIC_PATH + 'about'`, scroll to top
      push(`${PUBLIC_PATH}about/test-1`)
      eventMap.popstate()
      expect(scrollToTopOfResults).toBeCalled()
    })
  })

  describe('onNavChange', () => {
    it('should scroll to the top of the results', () => {
      instance.onNavChange()
      expect(scrollToTopOfResults).toBeCalled()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('components - AboutPage - ComplianceDashboard', () => {
  beforeEach(() => {
    client.getCompliance.mockResolvedValue(compliances)
    wrapper = shallow(<ComplianceDashboard />)
    instance = wrapper.instance()
  })

  describe('componentDidMount', () => {
    it('should do nothing if it is `loading`', () => {
      testLoading(instance)
    })

    it('should load the webcomponent if it does not exist', () => {
      testWebcomponentLoads(instance)
    })

    it('should not try to load the webcomponent if exists', () => {
      testWebcomponentExists(instance)
    })

    it('should load the compliances into local state', () => {
      const expected = [
        expect.objectContaining({ acronym: 'DOD' }),
        expect.objectContaining({ acronym: 'DOE' })
      ]
      expect(wrapper.state('compliance')).toEqual(expected)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('components - AboutPage - InventoryCode', () => {
  beforeEach(() => {
    wrapper = shallow(<InventoryCode />)
    instance = wrapper.instance()
    jest.spyOn(instance, 'setState')
  })

  describe('componentDidMount', () => {
    it('should do nothing if it is `loading`', () => {
      testLoading(instance)
    })

    it('should load the webcomponent if it does not exist', () => {
      testWebcomponentLoads(instance)
    })

    it('should not try to load the webcomponent if exists', () => {
      testWebcomponentExists(instance)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('components - AboutPage - JSONValidator', () => {
  beforeEach(() => {
    wrapper = shallow(<JSONValidator />)
    instance = wrapper.instance()
    jest.spyOn(instance, 'setState')
  })

  describe('componentDidMount', () => {
    it('should do nothing if it is `loading`', () => {
      testLoading(instance)
    })

    it('should load the webcomponent if it does not exist', () => {
      testWebcomponentLoads(instance)
    })

    it('should not try to load the webcomponent if exists', () => {
      testWebcomponentExists(instance)
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
