import React from 'react'
import { shallow } from 'enzyme'

export const testRenderText = (render, expected) => {
  const rendered = shallow(<div>{render}</div>)
  expect(rendered.text()).toMatch(expected)
  return rendered
}

export const testRenderList = (render, selector, expected) => {
  const rendered = shallow(<div>{render}</div>)
  expect(rendered.find(selector).length).toBe(expected)
  return rendered
}

export const testRenderEmpty = (render) => {
  const rendered = shallow(<div>{render}</div>)
  expect(rendered.text()).toBeFalsy()
  return rendered
}
