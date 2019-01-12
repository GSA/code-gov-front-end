/* global PUBLIC_PATH */
import React, { Component, Fragment } from 'react'
import HomeAbout from 'components/home-about'
import HomeBanner from 'components/home-banner'
import HomeFeaturedProjects from 'components/home-featured-projects'
import HomePress from 'components/home-press'
import { refreshView } from 'utils/other'

export default class HomeComponent extends Component {
  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', () => {
      console.log('pop start in home cpoment:', PUBLIC_PATH)
      if (window.location.pathname === PUBLIC_PATH) {
        refreshView()
      }
    })
  }

  render() {
    return (
      <Fragment>
        <HomeBanner />
        <HomeAbout />
        <HomeFeaturedProjects />
        <HomePress />
      </Fragment>
    )
  }
}
