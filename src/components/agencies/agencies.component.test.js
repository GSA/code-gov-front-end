import React from 'react'
import { shallow } from 'enzyme'

import { config } from 'components/federal-agencies/compliance-dashboard.container'
import ComplianceDashboard from 'components/federal-agencies/compliance-dashboard.component'

const props = {
  config,
  data: [
    {
      acronym: 'USDA',
      img: '/assets/img/logos/agencies/USDA-50x50.png',
      name: 'Department of Agriculture',
      requirements: {
        overall: 0.25,
        sub: {
          agencyWidePolicy: 0.75,
          inventoryRequirement: 0,
          openSourceRequirement: 0,
          schemaFormat: 0.5
        }
      }
    }
  ]
}

let wrapper
describe('components - ComplianceDashboard', () => {
  beforeEach(() => {
    wrapper = shallow(<ComplianceDashboard {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render proper number of cards', () => {
    wrapper.setProps({
      data: [
        ...props.data,
        {
          acronym: 'DOD',
          img: '/assets/img/logos/agencies/DOD-50x50.png',
          name: 'Department of Defense',
          requirements: {
            overall: 0,
            sub: {
              agencyWidePolicy: 0,
              inventoryRequirement: 0,
              openSourceRequirement: 0,
              schemaFormat: 0.5
            }
          }
        }
      ]
    })
    expect(wrapper.find('.usa-card__container')).toHaveLength(2)
  })

  describe('card', () => {
    it('should render an image', () => {
      expect(wrapper.find('img').prop('alt')).toEqual('Department of Agriculture logo')
      expect(wrapper.find('img').prop('src')).toEqual('/assets/img/logos/agencies/USDA-50x50.png')
    })

    it('should render agency name', () => {
      expect(wrapper.find('h2').text()).toEqual('Department of Agriculture')
    })

    it('should render proper number of requirement lines', () => {
      expect(wrapper.find('.border-left-1')).toHaveLength(config.text.length)
    })

    it('should render properly for compliant status', () => {
      wrapper.setProps({
        data: [
          {
            ...props.data[0],
            requirements: {
              ...props.data[0].requirements,
              overall: 1
            }
          }
        ]
      })
      expect(wrapper.find('h3').text()).toEqual('Fully compliant')
      expect(wrapper.find('h3').prop('className')).toContain('text-success-dark')
      expect(wrapper.find('.usa-card').prop('className')).toContain('border-success')
    })

    it('should render properly for partial status', () => {
      wrapper.setProps({
        data: [
          {
            ...props.data[0],
            requirements: {
              ...props.data[0].requirements,
              overall: 0.25
            }
          }
        ]
      })
      expect(wrapper.find('h3').text()).toEqual('Partially compliant')
      expect(wrapper.find('h3').prop('className')).toContain('text-warning-darker')
      expect(wrapper.find('.usa-card').prop('className')).toContain('border-warning')
    })

    it('should render properly for noncompliant status', () => {
      wrapper.setProps({
        data: [
          {
            ...props.data[0],
            requirements: {
              ...props.data[0].requirements,
              overall: 0
            }
          }
        ]
      })
      expect(wrapper.find('h3').text()).toEqual('Non-compliant')
      expect(wrapper.find('h3').prop('className')).toContain('text-error-dark')
      expect(wrapper.find('.usa-card').prop('className')).toContain('border-error-dark')
    })

    it('should render requirement properly for compliant status', () => {
      wrapper.setProps({
        data: [
          {
            ...props.data[0],
            requirements: {
              ...props.data[0].requirements,
              sub: {
                ...props.data[0].requirements.sub,
                agencyWidePolicy: 1
              }
            }
          }
        ]
      })

      const element = wrapper.find('.border-left-1').first()
      expect(element.prop('className')).toContain('border-success')
      expect(element.text()).toEqual(config.text[0].variants.compliant)
    })

    it('should render requirement properly for partial status', () => {
      wrapper.setProps({
        data: [
          {
            ...props.data[0],
            requirements: {
              ...props.data[0].requirements,
              sub: {
                ...props.data[0].requirements.sub,
                agencyWidePolicy: 0.25
              }
            }
          }
        ]
      })

      const element = wrapper.find('.border-left-1').first()
      expect(element.prop('className')).toContain('border-warning')
      expect(element.text()).toEqual(config.text[0].variants.partial)
    })

    it('should render requirement properly for noncompliant status', () => {
      wrapper.setProps({
        data: [
          {
            ...props.data[0],
            requirements: {
              ...props.data[0].requirements,
              sub: {
                ...props.data[0].requirements.sub,
                agencyWidePolicy: 0
              }
            }
          }
        ]
      })

      const element = wrapper.find('.border-left-1').first()
      expect(element.prop('className')).toContain('border-error-dark')
      expect(element.text()).toEqual(config.text[0].variants.noncompliant)
    })
  })
})
