import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import RepoCardComponent from './repo-card.component';

const mapStateToProps = state => {
  return {
    agencyName: 'GSA',
    description: 'Cloud Foundry buildpack for the Python Language',
    name: 'python-buildpack',
    repositoryURL: 'https://github.com/18F/python-buildpack',
    usageType: 'openSource',
    isGitHubRepo: true,
    languages: ['Python'],
    licenseName: 'CC0-1.0'
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

const RepoCardContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
  })
)(RepoCardComponent);

export default RepoCardContainer;
