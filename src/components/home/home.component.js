import React, { Fragment } from 'react'
import HomeAbout from '../home-about'
import HomeBanner from '../home-banner'
import HomeFeaturedProjects from '../home-featured-projects'
import './home.scss'

export default class HomeComponent extends React.Component {

  render() {
    return (
      <Fragment>
        <HomeBanner/>
        <HomeAbout/>
        <HomeFeaturedProjects/>
        <div>END</div>
      </Fragment>
    )
    /*    return (

            <div></div>
          </Fragment>
        )
      */
  }

}
