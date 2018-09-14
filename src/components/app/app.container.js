import AppComponent from './app.component';
import UrlService from '../../services/UrlService';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';


const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => {
  return {}
}

const AppContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AppComponent);

export default withRouter(AppContainer);
