import { connect } from 'react-redux'
import history from 'browser-history'
import CustomLinkComponent from './custom-link.component'

const mapDispatchToProps = dispatch => {
  return {
    updateRouter: to => {
      const searchMatch = to.match(/\?.*/)
      history.push({
        hash: '',
        pathname: to.match(/^[^?&#]*/)[0],
        search: searchMatch ? searchMatch[0] : ''
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(CustomLinkComponent)
