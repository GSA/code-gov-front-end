import React from 'react'
import { shallow } from 'enzyme'
import HomeNews from 'components/home-news/home-news.component'

const props = {
  newsItems: [
    { title: 't1', url: 'u1', description: 'd1', date: 'dt1', image: 'i1', alt: 'alt1' },
    { title: 't2', url: 'u2', description: 'd2', date: 'dt2', image: 'i2', alt: 'alt2' },
    { title: 't3', url: 'u3', description: 'd3', date: 'dt3', image: 'i3', alt: 'alt3' }
  ]
}

let wrapper

describe('components - HomeNews', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeNews {...props} />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should map all the `exploreItems`', () => {
    expect(wrapper.find('li').length).toBe(props.newsItems.length)
  })
})
