import React, { Fragment } from 'react'
import HomeExplore from 'components/home-explore'
import HomeAbout from 'components/home-about'
import HomeBanner from 'components/home-banner'
import HomeNews from 'components/home-news'
import { refreshView } from 'utils/other'

export default class HomeComponent extends React.Component {
  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', _event => {
      // console.log('pop start in home cpoment:', PUBLIC_PATH)
      if (window.location.pathname === PUBLIC_PATH) {
        refreshView()
      }
    })
  }

  render() {
    return (
      <Fragment>
        <main role="main" id="main-content">
          <HomeBanner />
          <div className="grid-container">
            <HomeExplore />
            <div className="grid-row grid-gap">
              <HomeAbout />
              <HomeNews />
            </div>
          </div>
        </main>
      </Fragment>
    )
  }
}
