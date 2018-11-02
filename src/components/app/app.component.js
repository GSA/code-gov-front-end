/* global history */
/* global URLSearchParams */

import React, { Component, Fragment } from 'react'
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
import { getConfigValue, refreshView } from 'utils/other'
import { parseLocation } from 'utils/url-parsing'
import { last, map } from '@code.gov/cautious'

console.log("PolicyGuide:", PolicyGuide)

export default class AppComponent extends Component {

  loadParamsFromURL() {
    console.log("starting loadParamsFromURL")
    const {
      agencies,
      languages,
      licenses,
      page,
      pathname,
      sort,
      query,
      skillLevels,
      timeRequired
    } = parseLocation(this.props.location)
    console.error("sort from location is :", sort)

    if (pathname.includes('browse-projects')) {
      if (languages) { this.props.updateBrowseParams('languages', languages) }
      if (agencies) { this.props.updateBrowseParams('agencies', agencies) }
      if (licenses) { this.props.updateBrowseParams('licenses', licenses) }
      if (page) { this.props.updateBrowseParams('page', page) }
      if (sort) { this.props.updateBrowseParams('sort', sort) }
    } if (pathname.includes('search')) {
      if (query) { this.props.loadInitialSearch(query) }
      if (languages) { this.props.updateSearchParams('languages', languages) }
      if (agencies) { this.props.updateSearchParams('agencies', agencies) }
      if (licenses) { this.props.updateSearchParams('licenses', licenses) }
      if (page) { this.props.updateSearchParams('page', page) }
      if (sort) { this.props.updateSearchParams('sort', sort) }
    } else if (pathname.includes('open-tasks')) {
      if (languages) { this.props.updateTaskFilters('languages', languages) }
      if (agencies) { this.props.updateTaskFilters('agencies', agencies) }
      if (skillLevels) { this.props.updateTaskFilters('skillLevels', skillLevels) }
      if (timeRequired) { this.props.updateTaskFilters('timeRequired', timeRequired) }
      if (page) { this.props.updateSearchParams('page', page) }
    } else if (pathname.includes('projects/')) {
      const repoID = last(pathname.split('/'))
      if (repoID) { this.props.loadProject(repoID) }
    }
    console.log("finishing loadParamsFromURL")
  }

  componentDidMount() {
    console.error("app component did mount")
    refreshView()
    this.loadParamsFromURL()
  }

  render() {


    return (
      <ConnectedRouter history={history}>
        <div className='App'>
          <Menu />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={AboutPage}/>
            <Route path='/browse-projects' component={BrowseProjects}/>
            <Route path='/open-tasks' component={OpenTasks}/>
            <Route path='/privacy-policy' component={PrivacyPolicy}/>
            <Route path='/projects/:repoID' component={ProjectPage}/>
            <Route path='/roadmap' component={Roadmap}/>
            <Route path='/search' component={SearchPage}/>
            <Route path='/policy-guide' component={PolicyGuide}/>
            <Redirect to='/' />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    )
  }
}
