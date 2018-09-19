import React, { Fragment } from 'react'
import HomeAbout from '../home-about'
import HomeBanner from '../home-banner'
import HomeFeaturedProjects from '../home-featured-projects'
import HomePress from '../home-press'
import './home.scss'

export default class HomeComponent extends React.Component {

  render() {
    return (
      <Fragment>
        <HomeBanner/>
        <HomeAbout/>
        <HomeFeaturedProjects/>
        <HomePress/>
      </Fragment>
    )
  }

}
