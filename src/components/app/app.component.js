import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from 'browser-history'
import AboutPage from 'components/plugins/about-page'
import Roadmap from 'components/roadmap'
import Home from 'components/home'
import BrowseProjects from 'components/browse-projects'
import OpenTasks from 'components/open-tasks'
import ProjectPage from 'components/project-page'
import SearchPage from 'components/search-page'
import Menu from 'components/menu'
import Footer from 'components/footer'
import PolicyGuide from 'components/plugins/policy-guide'
import PrivacyPolicy from 'components/privacy-policy'
import { refreshView } from 'utils/other'

export default class AppComponent extends Component {

  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', _event => {
      this.props.rehydrate()
    })
  }

  render() {

    const location = window.location

    return (
      <ConnectedRouter history={history}>
        <div className='App'>
          <Menu />
          <Switch location={location}>
            <Route exact path='/' component={Home}/>
            <Route path='/search' component={SearchPage}/>
            <Route path='/about' component={AboutPage}/>
            <Route path='/browse-projects' component={BrowseProjects}/>
            <Route path='/open-tasks' component={OpenTasks}/>
            <Route path='/privacy-policy' component={PrivacyPolicy}/>
            <Route path='/projects/:repoID' component={ProjectPage}/>
            <Route path='/roadmap' component={Roadmap}/>

            <Route path='/policy-guide' component={PolicyGuide}/>
            <Route path='/about' component={AboutPage}/>

            <Redirect to='/' />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    )
  }
}
