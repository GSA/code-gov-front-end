import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import updateQuery from 'actions/update-query'
import HomeBannerSearchBoxComponent from './home-banner-search-box.component'


const mapStateToProps = ({ query, siteConfig }) => {
  return {
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (query) => {
//      console.log("starting onSubmit with query:", query)
      //dispatch(updateQuery(query))
  //    history.push('/search')
      dispatch(push('/search'))
    },
    updateQuery: (query) => {
      //console.log("starting props.updateQuery")
      //dispatch(updateQuery(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerSearchBoxComponent)
