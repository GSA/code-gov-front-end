import { connect } from 'react-redux';
import HomeNews from './home-news.component'
import { getConfigValue } from 'utils/other'

export const mapStateToProps = () => {
  return {
    news: getConfigValue('content.home.news')
  }
}

export default connect(mapStateToProps)(HomeNews)
