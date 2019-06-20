import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import HomeExploreComponent from './home-explore.component'

export const mapStateToProps = () => ({
  exploreItems: getConfigValue('content.home.explore')
})

export default connect(mapStateToProps)(HomeExploreComponent)
