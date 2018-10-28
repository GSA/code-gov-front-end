/* global history */
/* global URLSearchParams */

import React from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from 'browser-history'
import Roadmap from 'components/roadmap'
import Home from 'components/home'
import BrowseProjects from 'components/browse-projects'
import OpenTasks from 'components/open-tasks'
import ProjectPage from 'components/project-page'
import SearchPage from 'components/search-page'
import Menu from 'components/menu'
import Footer from 'components/footer'
import PrivacyPolicy from 'components/privacy-policy'
import { refreshView, normalize } from 'utils/other'
import { parseLocation } from 'utils/url-parsing'
import { last } from '@code.gov/cautious'


import siteConfig from '../../../config/site/site.json'


export default class AppComponent extends React.Component {

  loadParamsFromURL() {
    console.log("starting loadParamsFromURL")
    const {
      agencies,
      languages,
      licenses,
      page,
      pathname,
      query,
      skillLevels,
      timeRequired
    } = parseLocation(this.props.location)

    if (pathname.includes('browse-projects')) {
      if (languages) { this.props.updateBrowseFilters('languages', languages) }
      if (agencies) { this.props.updateBrowseFilters('agencies', agencies) }
      if (licenses) { this.props.updateBrowseFilters('licenses', licenses) }
      if (page) { this.props.updateBrowseFilters('page', page) }
    } if (pathname.includes('search')) {
      if (query) { this.props.loadInitialSearch(query) }
      if (languages) { this.props.updateSearchFilters('languages', languages) }
      if (agencies) { this.props.updateSearchFilters('agencies', agencies) }
      if (licenses) { this.props.updateSearchFilters('licenses', licenses) }
      if (page) { this.props.updateSearchFilters('page', page) }
    } else if (pathname.includes('open-tasks')) {
      if (languages) { this.props.updateTaskFilters('languages', languages) }
      if (agencies) { this.props.updateTaskFilters('agencies', agencies) }
      if (skillLevels) { this.props.updateTaskFilters('skillLevels', skillLevels) }
      if (timeRequired) { this.props.updateTaskFilters('timeRequired', timeRequired) }
      if (page) { this.props.updateSearchFilters('page', page) }
    } else if (pathname.includes('projects/')) {
      const repoID = last(pathname.split('/'))
      if (repoID) { this.props.loadProject(repoID) }
    }
    console.log("finishing loadParamsFromURL")
  }

  componentDidMount() {
    refreshView()
    this.props.saveSiteConfig(siteConfig)
    this.loadParamsFromURL()
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className='App'>
          <Menu />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/browse-projects' component={BrowseProjects}/>
            <Route path='/open-tasks' component={OpenTasks}/>
            <Route path='/privacy-policy' component={PrivacyPolicy}/>
            <Route path='/projects/:repoID' component={ProjectPage}/>
            <Route path='/roadmap' component={Roadmap}/>
            <Route path='/search' component={SearchPage}/>
            <Redirect to='/' />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    )
  }
}
