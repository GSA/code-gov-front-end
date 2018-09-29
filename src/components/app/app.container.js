import AppComponent from './app.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import saveSiteConfig from 'actions/save-site-config'
import saveInitialSelections from 'actions/save-initial-selections'

const mapDispatchToProps = dispatch => {
  return {
    saveSiteConfig: (siteConfig) => dispatch(saveSiteConfig(siteConfig)),
    saveInitialSelections: (saveInitialSelections) => dispatch(saveSiteConfig(saveInitialSelections))
  }
}

const AppContainer = connect(null, mapDispatchToProps)(AppComponent);

export default withRouter(AppContainer);
