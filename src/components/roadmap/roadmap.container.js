import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import RoadmapComponent from './roadmap.component'

export const mapStateToProps = () => ({
  overview: getConfigValue('content.roadmap.overview'),
  near: getConfigValue('content.roadmap.near'),
  mid: getConfigValue('content.roadmap.mid'),
  long: getConfigValue('content.roadmap.long'),
  disclaimer: getConfigValue('content.roadmap.disclaimer')
})

export default connect(mapStateToProps)(RoadmapComponent)
