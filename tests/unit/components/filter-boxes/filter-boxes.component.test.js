import React from 'react'
import { shallow } from 'enzyme'

import FilterBoxes from 'components/filter-boxes/filter-boxes.component'

const props = {
  boxes: {
    agencies: [{ id: 'a1', value: 'v1' }, { id: 'a2', value: 'v2' }],
    languages: [{ id: 'l1', value: 'v3' }],
    empty: [],
    notInConfig: [{ id: 'n1', value: 'v4' }],
  },
  config: [
    [ 'c1', 'agencies' ],
    [ 'c2', 'languages' ],
    [ 'c3', 'empty' ],
  ],
  onFilterBoxChange: jest.fn(),
}

let wrapper
let instance
describe('components - FilterBoxes', () => {
  beforeEach(() => {
    wrapper = shallow(<FilterBoxes {...props} />)
    instance = wrapper.instance()
  })

  describe('shouldComponentUpdate', () => {
    it('should update if next props are not current props', () => {
      const nextProps = { ...props, boxes: { agencies: [...props.boxes.agencies, { id: 'a99', value: 'v99' }] } }
      expect(instance.shouldComponentUpdate(nextProps)).toBeTruthy()
    })

    it('should not update if next props are the same as current props', () => {
      expect(instance.shouldComponentUpdate(props)).toBeFalsy()
    })
  })

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render nothing if no boxes provided', () => {
      wrapper.setProps({ boxes: undefined })
      expect(wrapper.html()).toBeFalsy()
    })

    it('should render nothing if no config provided', () => {
      wrapper.setProps({ config: undefined })
      expect(wrapper.html()).toBeFalsy()
    })

    it('should map `onChange` to `onFilterBoxChange` with the correct category', () => {
      const event = { value: 123 }
      wrapper.find({ title: 'c1' }).simulate('change', event)
      expect(props.onFilterBoxChange).toBeCalledWith('agencies', event)
    })
  })
})