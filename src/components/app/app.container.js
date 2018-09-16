import AppComponent from './app.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import saveSiteConfig from 'actions/save-site-config'

const mapDispatchToProps = dispatch => {
  return {
    saveSiteConfig: (siteConfig) => dispatch(saveSiteConfig(siteConfig))
  }
}

const AppContainer = connect(null, mapDispatchToProps)(AppComponent);

export default withRouter(AppContainer);
