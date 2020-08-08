import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import HomeMetrics from './home-metrics.component'

export const mapStateToProps = () => ({
  metricsItems: getConfigValue('content.home.metrics')
})

export default connect(mapStateToProps)(HomeMetrics)
