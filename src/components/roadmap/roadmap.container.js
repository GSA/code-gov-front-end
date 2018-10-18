import { connect } from 'react-redux';
import { getConfigValue } from 'utils'
import RoadmapComponent from './roadmap.component'

const mapStateToProps = ({ siteConfig }) => {
  return {
    overview: getConfigValue(siteConfig, 'content.roadmap.overview'),
    near: getConfigValue(siteConfig, 'content.roadmap.near'),
    mid: getConfigValue(siteConfig, 'content.roadmap.mid'),
    long: getConfigValue(siteConfig, 'content.roadmap.long'),
    disclaimer: getConfigValue(siteConfig, 'content.roadmap.disclaimer')
  }
}

export default connect(mapStateToProps)(RoadmapComponent)
