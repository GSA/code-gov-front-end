import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH  }src/components/featured-projects/html/`

const OverviewAPIs = () => <LazyHTML url={`${dataurl}overview/apis.html`}/>

export default OverviewAPIs