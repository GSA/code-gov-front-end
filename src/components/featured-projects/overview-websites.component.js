import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH  }src/components/featured-projects/html/`

const OverviewWebsites = () => <LazyHTML url={`${dataurl}overview/websites.html`}/>

export default OverviewWebsites