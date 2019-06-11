import React, { Fragment } from 'react'
import HomeExplore from 'components/home-explore'
import HomeAbout from 'components/home-about'
import HomeBanner from 'components/home-banner'
import HomeFeaturedProjects from 'components/home-featured-projects'
import HomePress from 'components/home-press'
import { refreshView } from 'utils/other'

export default class HomeComponent extends React.Component {

  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', event => {
      console.log('pop start in home cpoment:', PUBLIC_PATH)
      if (window.location.pathname === PUBLIC_PATH) {
        refreshView()
      }
    })
  }
  render() {
    return (
      <Fragment>
        <HomeBanner/>
        <HomeExplore/>
        <HomeAbout/>
        <HomeFeaturedProjects/>
        <HomePress/>
      </Fragment>
    )
  }

}
