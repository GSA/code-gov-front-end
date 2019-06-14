import React, { Fragment } from 'react'
import HomeExplore from 'components/home-explore'
import HomeAbout from 'components/home-about'
import HomeBanner from 'components/home-banner'
import HomeNews from 'components/home-news'
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
        <HomeBanner />
        <div className="home-container">
          <HomeExplore />
          <div className="grid-half">
            <HomeAbout />
            <HomeNews />
          </div>
        </div>
      </Fragment>
    )
  }
}
