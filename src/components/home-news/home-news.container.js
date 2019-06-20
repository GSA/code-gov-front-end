import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import HomeNews from './home-news.component'

export const mapStateToProps = () => ({
  newsItems: getConfigValue('content.home.news')
})

export default connect(mapStateToProps)(HomeNews)
